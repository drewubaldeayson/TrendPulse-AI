import request from "supertest";
import app from "../app";
import * as admin from "firebase-admin";

// Mock Firebase Admin globally
jest.mock("firebase-admin", () => {
  const firestore = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    collectionGroup: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      empty: false,
      docs: [
        { id: "conversation1", data: () => ({ title: "Conversation 1" }) },
        { id: "conversation2", data: () => ({ title: "Conversation 2" }) },
      ],
    }),
    set: jest.fn(),
  };

  const auth = {
    verifyIdToken: jest.fn(),
  };

  return {
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
    firestore: jest.fn(() => firestore),
    auth: () => auth,
  };
});

// Access the mock for `verifyIdToken`
const mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock;

let server: any;

// Global setup for all tests
beforeAll((done) => {
  server = app.listen(0, done);
});

// Global teardown after all tests
afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  // By default, resolve a valid token for all routes
  mockVerifyIdToken.mockResolvedValue({ uid: "test-uid" });

  // Suppress console errors
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("Health check endpoint", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api/healthcheck");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "No token found" });
  });

  it("should return 401 if invalid token is provided", async () => {
    // Simulate an invalid token by rejecting the promise
    mockVerifyIdToken.mockRejectedValue(new Error("Invalid token"));

    const response = await request(app)
      .get("/api/healthcheck")
      .set("Authorization", "invalid-token");

    expect(mockVerifyIdToken).toHaveBeenCalledWith("invalid-token");
    expect(response.status).toBe(401);
  });

  it("should return 200 if valid token is provided", async () => {
    // Simulate a valid token by resolving the promise
    mockVerifyIdToken.mockResolvedValue({ uid: "test-uid" });
    const response = await request(app)
      .get("/api/healthcheck")
      .set("Authorization", "valid-token");

    expect(mockVerifyIdToken).toHaveBeenCalledWith("valid-token");
    expect(response.status).toBe(200);
  });
});

describe("Get all conversations endpoint", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api/conversations");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "No token found" });
  });

  it("should return conversations", async () => {
    // Mock token verification
    mockVerifyIdToken.mockResolvedValue({ uid: "test-uid" });

    const response = await request(app)
      .get("/api/conversations")
      .set("Authorization", "valid-token");

    expect(mockVerifyIdToken).toHaveBeenCalledWith("valid-token");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: "conversation1", title: "Conversation 1" },
      { id: "conversation2", title: "Conversation 2" },
    ]);
  });
});

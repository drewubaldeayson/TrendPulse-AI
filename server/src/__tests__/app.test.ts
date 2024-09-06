import request from "supertest";
import app from "../app";
import * as admin from "firebase-admin";

// Mock Firebase Admin
jest.mock("firebase-admin", () => {
  const auth = {
    verifyIdToken: jest.fn(),
  };

  return {
    initializeApp: jest.fn(),
    credential: {
      cert: jest.fn(),
    },
    auth: () => auth,
    firestore: jest.fn(),
  };
});

// Access the mock for `verifyIdToken`
const mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock;

let server: any;

describe("Health check endpoint", () => {
  beforeAll((done) => {
    server = app.listen(0, done);
  });

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll((done) => {
    server.close(done);
  });

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
});

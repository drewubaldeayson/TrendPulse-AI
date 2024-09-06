import request from "supertest";
import app from "../app";
import { admin } from "../firebase";

jest.useFakeTimers();

jest.mock("../firebase", () => ({
  admin: {
    auth: () => ({
      verifyIdToken: jest.fn(),
    }),
  },
}));

const mockVerifyIdToken = admin.auth().verifyIdToken as jest.Mock;

let testServer: any;

describe("Health check endpoint", () => {
  beforeAll((done) => {
    testServer = app.listen(5001, () => {
      console.log("Server is running on http://localhost:5001");
    });
    done();
  });

  afterAll((done) => {
    testServer.close(done);
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/api/healthcheck");

    expect(response.status).toBe(401);
  });
});

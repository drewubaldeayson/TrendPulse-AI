import express, { NextFunction, Request, Response } from "express";
import { admin } from "./firebase";
import { chatgpt } from "./chatgpt";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

interface AuthenticatedRequest extends Request {
  user?: any;
}

const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Unauthorized" });
    });
};

app.get("/healthcheck", isAuthenticated, (req, res) => {
  res.send("Health check OK");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

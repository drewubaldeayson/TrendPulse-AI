import express, { NextFunction, Request, Response } from "express";
import { admin } from "./firebase";
import dotenv from "dotenv";
import { chatgpt } from "./chatgpt";
dotenv.config();

const app = express();

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

app.get(
  "/",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    res.send("Authenticated route");
  }
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

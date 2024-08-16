import express, { Request, Response } from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "../serviceAccount.json";
dotenv.config();

const app = express();

app.use(express());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

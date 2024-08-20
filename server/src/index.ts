import express, { NextFunction, Request, Response } from "express";
import { admin, firestore } from "./firebase";
import cors from "cors";
import dotenv from "dotenv";
import { getChatGPTResponse } from "./chatgpt";
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
    console.error("No token found");
    return res.status(401).json({ error: "No token found" });
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

// Get all messages
app.get(
  "/api/messages",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    try {
      // Reference to the Firestore collection for this user's conversation
      const messagesRef = firestore
        .collection("conversations")
        .doc(userId)
        .collection("messages");

      // Fetch all messages
      const snapshot = await messagesRef.orderBy("timestamp").get();
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          role: data.role,
          content: data.content,
        };
      });

      // Send messages back to the user
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Post a new message
app.post(
  "/api/messages",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const { message } = req.body;
    const userId = req.user?.uid;

    if (!message || !userId) {
      return res.status(400).json({ error: "Missing message or user ID" });
    }

    try {
      // Reference to the Firestore collection for this user's conversation
      const messagesRef = firestore
        .collection("conversations")
        .doc(userId)
        .collection("messages");

      // Fetch existing messages, limiting to the last 10
      const snapshot = await messagesRef.orderBy("timestamp").limit(10).get();
      const messages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          role: data.role,
          content: data.content,
        };
      });

      // Add user message to Firestore
      await messagesRef.add({
        role: "user",
        content: message,
        timestamp: new Date(),
      });

      // Get response from ChatGPT
      const chatGPTResponse = await getChatGPTResponse([
        ...messages,
        { role: "user", content: message },
      ]);

      // Add ChatGPT response to Firestore
      await messagesRef.add({
        role: "assistant",
        content: chatGPTResponse,
        timestamp: new Date(),
      });

      // Send response back to the user
      res.send(chatGPTResponse);
    } catch (error) {
      console.error("Error handling message:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Health Check
app.get(
  "/api/healthcheck",
  isAuthenticated,
  (req: AuthenticatedRequest, res: Response) => {
    res.send("Health check OK");
  }
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

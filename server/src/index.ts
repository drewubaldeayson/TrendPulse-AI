import express, { NextFunction, Request, Response } from "express";
import { admin, firestore } from "./firebase";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { getChatGPTResponse } from "./chatgpt";
import axios from "axios";
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

// Get all conversations from a specific user
app.get(
  "/api/conversations",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    try {
      // Reference to the Firestore collection for this user's conversations
      const conversationsRef = firestore
        .collection("users")
        .doc(userId)
        .collection("conversations");

      // Fetch all conversations
      let conversationsDoc = await conversationsRef.get();

      // If there are no conversations, create a new one
      if (conversationsDoc.empty) {
        // Make a new conversation id
        const conversationId = uuidv4();

        await conversationsRef
          .doc(conversationId)
          .set({ title: "New Chat" }, { merge: true });

        conversationsDoc = await conversationsRef.get();
      }

      const conversations = conversationsDoc.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
        };
      });

      // Send conversations back to the user
      res.json(conversations);
    } catch (error) {
      console.error("Error getting conversations:", error);
      res.status(500).json({ error: "Failed to get conversations" });
    }
  }
);

// Create a new conversation
app.post(
  "/api/conversations",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    try {
      // Make a new conversation id
      const conversationId = uuidv4();

      await firestore
        .collection("users")
        .doc(userId)
        .collection("conversations")
        .doc(conversationId)
        .set({ title: "New Chat" }, { merge: true });

      // Send conversation ID back to the user
      res.json({ id: conversationId, title: "New Chat" });
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }
);

// Get all messages in a specific conversation
app.get(
  "/api/conversations/:conversationId",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.uid;
    const { conversationId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    if (!conversationId) {
      return res.status(400).json({ error: "Missing conversation ID" });
    }

    try {
      // Reference to the Firestore collection for this user's conversation
      const messagesRef = firestore
        .collection("users")
        .doc(userId)
        .collection("conversations")
        .doc(conversationId)
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

// Post a new message in a specific conversation
app.post(
  "/api/conversations/:conversationId",
  isAuthenticated,
  async (req: AuthenticatedRequest, res: Response) => {
    const { message } = req.body;
    const userId = req.user?.uid;
    const { conversationId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing user ID" });
    }

    // If there is no message, return error
    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    try {
      // Create response object
      let response: {
        title?: string | null;
        id?: string | null;
        message: string | null;
      } = {
        message: null,
      };

      // Create reference to user's conversation in Firestore
      const conversationsRef = firestore
        .collection("users")
        .doc(userId)
        .collection("conversations")
        .doc(conversationId);

      // Retrieve the conversation document to check if it exists
      const conversationsDoc = await conversationsRef.get();

      // If conversation title is default title, generate a new title
      if (conversationsDoc.data()?.title === "New Chat") {
        const newTitle = await getChatGPTResponse([
          {
            role: "user",
            content:
              "Based on the following conversation, generate a concise and descriptive title " +
              "that accurately captures the main topics discussed, using no more than 4 words. " +
              "The title should only contain alphanumeric characters and spaces. Do not wrap it in quotation marks.\n\n" +
              message,
          },
        ]);

        await conversationsRef.set(
          {
            title: newTitle,
          },
          { merge: true }
        );

        response.title = newTitle;
        response.id = conversationId;
      }

      // Access the collection for messages in this conversation
      const messagesRef = conversationsRef.collection("messages");

      // Retrieve the last 10 messages from Firestore
      const messagesDoc = await messagesRef
        .orderBy("timestamp")
        .limit(10)
        .get();

      const messages = messagesDoc.docs.map((doc) => {
        const data = doc.data();
        return {
          role: data.role,
          content: data.content,
        };
      });

      // Save the user's message to Firestore
      await messagesRef.add({
        role: "user",
        content: message,
        timestamp: new Date(),
      });

      // Get the ChatGPT response based on the conversation history and new message
      const chatGPTResponse = await getChatGPTResponse([
        ...messages,
        { role: "user", content: message },
      ]);

      // Save the assistant's response to Firestore
      await messagesRef.add({
        role: "assistant",
        content: chatGPTResponse,
        timestamp: new Date(),
      });

      // Return the assistant's response to the user
      response.message = chatGPTResponse;
      res.json(response);
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
  (_req: AuthenticatedRequest, res: Response) => {
    res.send("Health check OK");
  }
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

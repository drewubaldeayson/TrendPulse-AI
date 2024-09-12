import express, { NextFunction, Request, Response } from "express";
import { admin, firestore } from "./firebase";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { getChatGPTResponse } from "./chatgpt";
import { scrapeInstagram } from "./instagram";

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

/**
 * Middleware to check if the request is authenticated.
 * @param {AuthenticatedRequest} req - The request object, extended with user information.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    console.error("No token found");
    return res.status(401).json({ error: "No token found" });
  }

  const token = req.headers.authorization.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : req.headers.authorization;

  try {
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

/**
 * Get all conversations for the authenticated user.
 * @route GET /api/conversations
 * @param {AuthenticatedRequest} req - The request object, extended with user information.
 * @param {Response} res - The response object.
 * @returns {Response} 200 - An array of conversation objects.
 * @returns {Response} 400 - Error message if user ID is missing.
 * @returns {Response} 500 - Error message if failed to retrieve conversations.
 */
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
      let conversationsDoc = await conversationsRef
        .orderBy("timestamp", "desc")
        .get();

      // If there are no conversations, create a new one
      if (conversationsDoc.empty) {
        // Make a new conversation id
        const conversationId = uuidv4();

        await conversationsRef
          .doc(conversationId)
          .set({ title: "New Chat", timestamp: Date.now() }, { merge: true });

        conversationsDoc = await conversationsRef
          .orderBy("timestamp", "desc")
          .get();
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

/**
 * Create a new conversation for the authenticated user.
 * @route POST /api/conversations
 * @param {AuthenticatedRequest} req - The request object, extended with user information.
 * @param {Response} res - The response object.
 * @returns {Response} 200 - The created conversation object.
 * @returns {Response} 400 - Error message if user ID is missing.
 * @returns {Response} 500 - Error message if failed to create conversation.
 */
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
        .set({ title: "New Chat", timestamp: Date.now() }, { merge: true });

      // Send conversation ID back to the user
      res.json({ id: conversationId, title: "New Chat" });
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }
);

/**
 * Delete a specific conversation for the authenticated user.
 * @route DELETE /api/conversations/:conversationId
 * @param {AuthenticatedRequest} req - The request object, extended with user information.
 * @param {Response} res - The response object.
 * @param {string} req.params.conversationId - The ID of the conversation to delete.
 * @returns {Response} 204 - No content if conversation is successfully deleted.
 * @returns {Response} 400 - Error message if user ID or conversation ID is missing.
 * @returns {Response} 500 - Error message if failed to delete conversation.
 */
app.delete(
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
      const conversationsRef = firestore
        .collection("users")
        .doc(userId)
        .collection("conversations");

      // Delete the conversation
      await conversationsRef.doc(conversationId).delete();
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ error: "Failed to delete conversation" });
    }
  }
);

/**
 * Get all messages in a specific conversation for the authenticated user.
 * @route GET /api/conversations/:conversationId
 * @param {AuthenticatedRequest} req - The request object, extended with user information.
 * @param {Response} res - The response object.
 * @param {string} req.params.conversationId - The ID of the conversation.
 * @returns {Response} 200 - An array of message objects.
 * @returns {Response} 400 - Error message if user ID or conversation ID is missing.
 * @returns {Response} 500 - Error message if failed to fetch messages.
 */
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

/**
 * Post a new message to a specific conversation for the authenticated user.
 * @route POST /api/conversations/:conversationId
 * @param {AuthenticatedRequest} req - The request object, extended with user information.
 * @param {Response} res - The response object.
 * @param {string} req.params.conversationId - The ID of the conversation.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.message - The content of the message to post.
 * @returns {Response} 200 - The assistant's response and possibly the updated conversation title.
 * @returns {Response} 400 - Error message if user ID is missing or message content is missing.
 * @returns {Response} 500 - Error message if failed to handle the message.
 */
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

/**
 *
 *
 */
app.get(
  "/api/instagram/:account",
  async (req: AuthenticatedRequest, res: Response) => {
    const { account } = req.params;

    if (!account) {
      return res.status(400).json({ error: "Missing account" });
    }

    try {
      const data = await scrapeInstagram(account);
      res.json(data);
    } catch (error) {
      console.error("Error scraping Instagram:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

/**
 * Health check endpoint to verify server status.
 * @route GET /api/healthcheck
 * @param {AuthenticatedRequest} _req - The request object, extended with user information.
 * @param {Response} res - The response object.
 * @returns {Response} 200 - Health check status message.
 */
app.get(
  "/api/healthcheck",
  isAuthenticated,
  (_req: AuthenticatedRequest, res: Response) => {
    res.send("Health check OK");
  }
);

export default app;

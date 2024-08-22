"use client";
import ConversationList, { Conversation } from "@/components/ConversationList";
import MessageBox from "@/components/MessageBox";
import MessageList, { Message } from "@/components/MessageList";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import WrapperChat from "@/components/WrapperChat";
import WrapperSidebar from "@/components/WrapperSidebar";
import { auth } from "@/firebase/config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [user] = useAuthState(auth);

  const handleNewConversation = async () => {
    const token = await user?.getIdToken(true);
    const response = await axios.post(
      "http://localhost:5000/api/conversations/",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setConversations((prevConversations) => [
      { id: response.data.id, title: response.data.title },
      ...prevConversations,
    ]);
    setConversation({ id: response.data.id, title: response.data.title });
  };

  const handleNewMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear the message input
    const submitMessage = newMessage.trim();
    setNewMessage("");

    // If there's no message, do nothing
    if (!submitMessage) {
      return;
    }

    // Append your own message with role "user"
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: submitMessage },
    ]);

    // Send the message to the server
    const token = await user?.getIdToken(true);
    const response = await axios.post(
      `http://localhost:5000/api/conversations/${conversation?.id}`,
      {
        message: submitMessage,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // Append the response from the server with role "assistant"
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: response.data.message },
    ]);

    // If there's a new title, update the conversation title
    if (response.data.title) {
      const updatedConversation = {
        id: response.data.id,
        title: response.data.title,
      };
      setConversation(updatedConversation);

      setConversations((prevConversations) =>
        // Find conversation id from conversations and replace title
        prevConversations.map((conversation) =>
          conversation.id === updatedConversation.id
            ? updatedConversation
            : conversation
        )
      );
    }
  };

  const getAllConversations = async () => {
    const token = await user?.getIdToken();
    if (!token) {
      return;
    }
    const response = await axios.get(
      "http://localhost:5000/api/conversations/",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setConversations(response.data);
    setConversation(response.data[0]);
  };

  const getAllMessages = async () => {
    const token = await user?.getIdToken();

    if (!token) {
      return;
    }
    const response = await axios.get(
      `http://localhost:5000/api/conversations/${conversation?.id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setMessages(response.data);
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  useEffect(() => {
    getAllMessages();
  }, [conversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main>
      <Navbar />
      <div className="flex">
        <WrapperSidebar>
          <Button variant="outline" size="sm" onClick={handleNewConversation}>
            New
          </Button>
          <ConversationList
            conversations={conversations}
            conversation={conversation}
            setConversation={setConversation}
          />
        </WrapperSidebar>
        <WrapperChat>
          <div className="flex-1">
            <MessageList messages={messages} title={conversation?.title} />
            <div ref={messagesEndRef} />
          </div>
          <MessageBox
            onSubmit={handleNewMessage}
            message={newMessage}
            setMessage={setNewMessage}
          />
        </WrapperChat>
      </div>
    </main>
  );
}

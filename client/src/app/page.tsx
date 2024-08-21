"use client";
import LogoutButton from "@/components/LogoutButton";
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import { Button } from "@/components/ui/button";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: string;
  content: string;
}

interface Conversation {
  id: string;
  title: string;
}

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleNewConversation = async () => {
    const token = sessionStorage.getItem("user");
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
      ...prevConversations,
      { id: response.data.id, title: response.data.title },
    ]);
    setConversation({ id: response.data.id, title: response.data.title });
  };

  const handleNewMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear the message input
    setNewMessage("");
    const submitMessage = newMessage;

    // Append your own message with role "user"
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: submitMessage },
    ]);

    // Send the message to the server
    const token = sessionStorage.getItem("user");
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
    const token = sessionStorage.getItem("user");
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
    const token = sessionStorage.getItem("user");

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
    <main className="flex">
      <div className="w-64 p-4 bg-primary-foreground">
        <div className="overflow-hidden">
          <LogoutButton />
          <Button variant="outline" onClick={handleNewConversation}>
            + New Conversation
          </Button>
          {conversations.map((convo) => (
            <Button
              variant="link"
              key={convo.id}
              onClick={() => setConversation(convo)}
              className={clsx({
                underline: convo.id === conversation?.id,
              })}
            >
              {convo.title}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto h-screen">
        <div className="flex-1">
          <MessageList messages={messages} title={conversation?.title} />
          <div ref={messagesEndRef} />
        </div>
        <div className="sticky bottom-0">
          <MessageBox
            onSubmit={handleNewMessage}
            message={newMessage}
            setMessage={setNewMessage}
          />
        </div>
      </div>
    </main>
  );
}

"use client";
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Append your own message with role "user"
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);

    // Clear the message input
    setMessage("");

    // Send the message to the server
    const token = sessionStorage.getItem("user");
    const response = await axios.post(
      "http://localhost:5000/api/messages",
      {
        message: message,
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
      { role: "assistant", content: response.data },
    ]);
  };

  const getAllMessages = async () => {
    const token = sessionStorage.getItem("user");
    if (!token) {
      return;
    }
    const response = await axios.get("http://localhost:5000/api/messages", {
      headers: {
        Authorization: token,
      },
    });
    setMessages(response.data);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main>
      <MessageList messages={messages} />
      <MessageBox
        onSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
      />
    </main>
  );
}

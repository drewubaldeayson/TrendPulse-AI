"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [message, setMessage] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
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

  return (
    <main>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <span className="capitalize">{message.role}: </span>
            {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}

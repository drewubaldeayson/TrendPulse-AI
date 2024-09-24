"use client";
import ConversationList, { Conversation } from "@/components/ConversationList";
import ConversationNew from "@/components/ConversationNew";
import MessageBox from "@/components/MessageBox";
import MessageList, { Message } from "@/components/MessageList";
import WrapperChat from "@/components/WrapperChat";
import WrapperSidebar from "@/components/WrapperSidebar";
import { auth } from "@/lib/firebaseConfig";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user] = useAuthState(auth);
  const { setValue, setFocus } = useFormContext();

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
    setCurrentConversation({
      id: response.data.id,
      title: response.data.title,
    });
  };

  const handleDeleteConversation = async (id: string) => {
    const token = await user?.getIdToken(true);
    await axios
      .delete(`http://localhost:5000/api/conversations/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setConversations((prevConversations) =>
          prevConversations.filter((conversation) => conversation.id !== id)
        );
        if (conversations.length === 1) {
          getAllConversations();
          return;
        }
        setCurrentConversation(conversations[1]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNewMessage: SubmitHandler<FieldValues> = async (data) => {
    // Clear the message input
    const submitMessage = data.message.trim();
    setValue("message", "");

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

    // Add a placeholder message with role "assistant"
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: "..." }, // Placeholder content
    ]);

    const response = await axios.post(
      `http://localhost:5000/api/conversations/${currentConversation?.id}`,
      {
        message: submitMessage,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // Update the placeholder message with the actual response
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.role === "assistant" && msg.content === "..."
          ? { ...msg, content: response.data.message }
          : msg
      )
    );

    // If there's a new title, update the conversation title
    if (response.data.title) {
      const updatedConversation = {
        id: response.data.id,
        title: response.data.title,
      };
      setCurrentConversation(updatedConversation);

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
    setCurrentConversation(response.data[0]);
    setLoadingConversations(false);
  };

  const getAllMessages = async () => {
    const token = await user?.getIdToken();

    if (!token) {
      return;
    }
    const response = await axios.get(
      `http://localhost:5000/api/conversations/${currentConversation?.id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setMessages(response.data);
    setLoadingMessages(false);
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  useEffect(() => {
    setLoadingMessages(true);
    getAllMessages();
  }, [currentConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setFocus("message");
  }, [setFocus]);

  return (
    <main>
      <div className="flex">
        <WrapperSidebar>
          <ConversationNew handleNewConversation={handleNewConversation} />
          <ConversationList
            loading={loadingConversations}
            handleDeleteConversation={handleDeleteConversation}
            conversations={conversations}
            currentConversation={currentConversation}
            setCurrentConversation={setCurrentConversation}
          />
        </WrapperSidebar>
        <WrapperChat>
          <div className="flex-1">
            <MessageList
              loading={loadingMessages}
              messages={messages}
              title={currentConversation?.title}
            />
            <div ref={messagesEndRef} />
          </div>
          <MessageBox onSubmit={handleNewMessage} />
        </WrapperChat>
      </div>
    </main>
  );
}

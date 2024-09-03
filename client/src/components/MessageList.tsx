import MessageHeader from "./MessageHeader";
import MessageSection from "./MessageSection";

export interface Message {
  role: string;
  content: string;
}

interface MessageListProps {
  messages: Message[];
  title: string | undefined;
  loading: boolean;
}

export default function MessageList({
  messages,
  title,
  loading,
}: MessageListProps) {
  if (loading) return null;

  return (
    <article className="flex flex-col p-4 prose md:p-8">
      <h3 className="text-center">{title}</h3>
      {messages.length === 0 ? (
        <MessageHeader />
      ) : (
        messages.map((message, index) => (
          <MessageSection
            key={index}
            role={message.role}
            content={message.content}
          />
        ))
      )}
    </article>
  );
}

import MessageHeader from "./MessageHeader";
import MessageSection from "./MessageSection";

export interface Message {
  role: string;
  content: string;
}

interface MessageListProps {
  messages: Message[];
  title: string | undefined;
}

export default function MessageList({ messages, title }: MessageListProps) {
  return (
    <article className="prose p-4 md:p-8 flex flex-col">
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

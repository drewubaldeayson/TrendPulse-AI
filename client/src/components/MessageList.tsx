import clsx from "clsx";
import ReactMarkdown from "react-markdown";

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
        <MessageSection role="assistant" content="Hi! Ask me anything." />
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

interface MessageSectionProps {
  role: string;
  content: string;
}

const MessageSection: React.FC<MessageSectionProps> = ({ role, content }) => (
  <section
    className={clsx({
      "self-end": role === "user",
    })}
  >
    <h4
      className={clsx({
        hidden: role === "user",
      })}
    >
      {role === "assistant" ? "Trendpulse-AI" : role}
    </h4>

    <ReactMarkdown
      className={clsx("text-sm md:text-base", {
        "w-fit bg-secondary py-2 px-4 rounded-xl border prose-sm":
          role === "user",
      })}
    >
      {content}
    </ReactMarkdown>
  </section>
);

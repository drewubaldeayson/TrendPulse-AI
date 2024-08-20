import clsx from "clsx";
import ReactMarkdown from "react-markdown";

interface MessageListProps {
  messages: Array<{ role: string; content: string }>;
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <article className="prose p-8 flex flex-col">
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
      className={clsx("capitalize", {
        hidden: role === "user",
      })}
    >
      {role}
    </h4>

    <ReactMarkdown
      className={clsx({
        "w-fit bg-secondary py-1 px-8 rounded border": role === "user",
      })}
    >
      {content}
    </ReactMarkdown>
  </section>
);

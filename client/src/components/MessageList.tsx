interface MessageListProps {
  messages: Array<{ role: string; content: string }>;
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <ul>
      {messages.length === 0 ? (
        <li>
          <span className="capitalize">assistant: </span>
          Hi! Ask me anything.
        </li>
      ) : (
        messages.map((message, index) => (
          <li key={index}>
            <span className="capitalize">{message.role}: </span>
            {message.content}
          </li>
        ))
      )}
    </ul>
  );
}

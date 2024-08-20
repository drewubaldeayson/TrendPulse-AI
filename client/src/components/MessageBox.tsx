import { Dispatch, SetStateAction } from "react";

interface MessageBoxProps {
  onSubmit: (e: React.FormEvent) => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export default function MessageBox({
  onSubmit,
  message,
  setMessage,
}: MessageBoxProps) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

import { Dispatch, SetStateAction } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

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
    <form
      className="flex gap-2 sticky bottom-0 bg-primary-foreground"
      onSubmit={onSubmit}
    >
      <Textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div>
        <Button className="h-full" type="submit">
          Send Chat
        </Button>
      </div>
    </form>
  );
}

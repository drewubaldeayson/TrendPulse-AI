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
    <div className="sticky bottom-0">
      <form className="p-8 flex gap-2 bg-white" onSubmit={onSubmit}>
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
    </div>
  );
}

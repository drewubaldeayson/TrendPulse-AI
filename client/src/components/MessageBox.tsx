import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { KeyboardEvent } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface MessageBoxProps {
  onSubmit: SubmitHandler<FieldValues>;
}

export default function MessageBox({ onSubmit }: MessageBoxProps) {
  const { register, handleSubmit } = useFormContext(); // Access form context

  // Handle keydown for submit on Enter, but not Shift + Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (new line)
      // Submit the form
      (e.target as HTMLTextAreaElement).form?.requestSubmit();
    }
  };

  return (
    <div className="sticky bottom-0">
      <form
        className="flex gap-2 px-4 pb-8 bg-white md:px-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Textarea
          placeholder="Type your message here..."
          {...register("message")} // Register message with React Hook Form
          onKeyDown={handleKeyDown}
        />
        <div>
          <Button className="h-full p-2 md:p-4" type="submit">
            Send Chat
          </Button>
        </div>
      </form>
    </div>
  );
}

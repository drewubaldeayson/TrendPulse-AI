import { FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button";

interface ConversationNewProps {
  handleNewConversation: () => void;
}

export default function ConversationNew({
  handleNewConversation,
}: ConversationNewProps) {
  return (
    <div className="flex justify-between px-2 prose md:px-4">
      <h4 className="m-0">Chats</h4>
      <Button
        variant="outline"
        className="px-2"
        size="sm"
        onClick={handleNewConversation}
      >
        <FaPlus className="mr-1" /> New
      </Button>
    </div>
  );
}

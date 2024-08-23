import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { FaRegTrashCan } from "react-icons/fa6";

export interface Conversation {
  id: string;
  title: string;
}

type ConversationListProps = {
  handleDeleteConversation: (id: string) => void;
  conversations: Conversation[];
  conversation: Conversation | null;
  setConversation: Dispatch<SetStateAction<Conversation | null>>;
};

export default function ConversationList({
  handleDeleteConversation,
  conversations,
  conversation,
  setConversation,
}: ConversationListProps) {
  return (
    <>
      {conversations.map((currentConversation) => (
        <div className="relative group">
          <Button
            variant="ghost"
            key={currentConversation.id}
            onClick={() => setConversation(currentConversation)}
            className={clsx(
              "px-2 md:px-4 text-sm w-full truncate text-start block",
              {
                underline: currentConversation.id === conversation?.id,
              }
            )}
          >
            {currentConversation.title}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 -translate-y-1/2 opacity-0 top-1/2 group-hover:opacity-100 bg-primary-foreground"
            onClick={() => handleDeleteConversation(currentConversation.id)}
          >
            <FaRegTrashCan />
          </Button>
        </div>
      ))}
    </>
  );
}

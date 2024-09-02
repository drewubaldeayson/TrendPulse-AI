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
  currentConversation: Conversation | null;
  setCurrentConversation: Dispatch<SetStateAction<Conversation | null>>;
  loading: boolean;
};

export default function ConversationList({
  handleDeleteConversation,
  conversations,
  currentConversation,
  setCurrentConversation,
  loading,
}: ConversationListProps) {
  if (loading) return null;

  return (
    <>
      {conversations.map((conversation) => (
        <div className="relative group">
          <Button
            variant="ghost"
            key={conversation.id}
            onClick={() => setCurrentConversation(conversation)}
            className={clsx(
              "px-2 md:px-4 text-sm w-full truncate text-start block",
              {
                underline: conversation.id === currentConversation?.id,
              }
            )}
          >
            {conversation.title}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 -translate-y-1/2 opacity-0 top-1/2 group-hover:opacity-100 bg-primary-foreground"
            onClick={() => handleDeleteConversation(conversation.id)}
          >
            <FaRegTrashCan />
          </Button>
        </div>
      ))}
    </>
  );
}

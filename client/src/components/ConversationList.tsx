import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { FaRegTrashCan } from "react-icons/fa6";

export interface Conversation {
  id: string;
  title: string;
}

type ConversationListProps = {
  conversations: Conversation[];
  conversation: Conversation | null;
  setConversation: Dispatch<SetStateAction<Conversation | null>>;
};

export default function ConversationList({
  conversations,
  conversation,
  setConversation,
}: ConversationListProps) {
  return (
    <>
      {conversations.map((convo) => (
        <div className="relative group">
          <Button
            variant="ghost"
            key={convo.id}
            onClick={() => setConversation(convo)}
            className={clsx(
              "px-2 md:px-4 text-xs md:text-sm w-full truncate text-start block",
              {
                underline: convo.id === conversation?.id,
              }
            )}
          >
            {convo.title}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 -translate-y-1/2 opacity-0 top-1/2 group-hover:opacity-100 bg-primary-foreground"
            onClick={() => console.log(convo.id)}
          >
            <FaRegTrashCan />
          </Button>
        </div>
      ))}
    </>
  );
}

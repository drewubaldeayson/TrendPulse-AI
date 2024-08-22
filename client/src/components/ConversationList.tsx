import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

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
        <Button
          variant="link"
          key={convo.id}
          onClick={() => setConversation(convo)}
          className={clsx("w-full truncate text-start block", {
            underline: convo.id === conversation?.id,
          })}
        >
          {convo.title}
        </Button>
      ))}
    </>
  );
}

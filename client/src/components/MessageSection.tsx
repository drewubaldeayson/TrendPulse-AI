import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { useState } from "react";
import { FaCheck, FaRegClipboard } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";

interface MessageSectionProps {
  role: string;
  content: string;
}

export default function MessageSection({ role, content }: MessageSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      className={clsx({
        "self-end": role === "user",
      })}
    >
      <h4
        className={clsx({
          hidden: role === "user",
        })}
      >
        {role === "assistant" ? "Trendpulse-AI" : role}
      </h4>
      <ReactMarkdown
        className={clsx("text-sm md:text-base", {
          "animate-fade-in w-fit bg-secondary py-2 px-4 rounded-xl border prose-sm":
            role === "user",
          "animate-pulse": role === "assistant" && content === "...",
          "animate-fade-in": role === "assistant" && content !== "...",
        })}
      >
        {content}
      </ReactMarkdown>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className={clsx({
                hidden: role === "user",
              })}
            >
              {copied ? (
                <FaCheck className="w-4 h-4" />
              ) : (
                <FaRegClipboard className="w-4 h-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Copy</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </section>
  );
}

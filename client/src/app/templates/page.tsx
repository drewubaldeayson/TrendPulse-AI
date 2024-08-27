"use client";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import clsx from "clsx";

interface Template {
  title: string;
  message: string;
}

interface Category {
  title: string;
  templates: Template[];
}

export default function Templates() {
  const { setValue } = useFormContext();
  const router = useRouter();
  const templates = [
    {
      title: "Content Idea Generation",
      templates: [
        {
          title: "Trending Topics",
          message:
            "What are the top trending topics on YouTube/TikTok right now within the [specific niche, e.g., tech, beauty, fitness] that I can create content about?",
        },
        {
          title: "Innovative Ideas",
          message:
            "Can you suggest innovative content ideas for my [YouTube/TikTok] channel that align with current trends in [specific category, e.g., travel, DIY]?",
        },
      ],
    },
    {
      title: "Audience Interaction",
      templates: [
        {
          title: "Positive Comments",
          message:
            "How can I craft engaging responses to positive comments on my [YouTube/TikTok] videos to encourage more interaction?",
        },
        {
          title: "Critical Comments",
          message:
            "I received a critical comment on my latest video. Can you help me draft a constructive and empathetic response to address the concern?",
        },
      ],
    },
    {
      title: "Scheduling and Reminders",
      templates: [
        {
          title: "Content Calendar",
          message:
            "Can you help me create a detailed content calendar for the next month, including ideal posting times and important deadlines for my [YouTube/TikTok] content?",
        },
        {
          title: "Scheduling Best Practices",
          message:
            "What are the best practices for scheduling my social media posts to maximize engagement and reach on [specific platform]?",
        },
      ],
    },
    {
      title: "Optimization Tips",
      templates: [
        {
          title: "Video Titles and Descriptions",
          message:
            "What are some effective strategies for optimizing my YouTube video titles and descriptions to improve search visibility and attract more viewers?",
        },
        {
          title: "Tags and Hashtags",
          message:
            "Can you recommend the best tags and hashtags to use for my TikTok video on [specific topic] to increase its discoverability?",
        },
      ],
    },
    {
      title: "Basic Analytics",
      templates: [
        {
          title: "Performance Metrics",
          message:
            "What key performance metrics should I track to evaluate the success of my YouTube/TikTok videos, and how can I use this data to improve future content?",
        },
        {
          title: "Video Performance Analysis",
          message:
            "How can I analyze my video performance on [specific platform] to understand viewer engagement and adjust my content strategy accordingly?",
        },
      ],
    },
    {
      title: "Learning and Resources",
      templates: [
        {
          title: "Viewer Retention",
          message:
            "What are some proven strategies for increasing viewer retention and watch time on my YouTube videos?",
        },
        {
          title: "Editing Resources",
          message:
            "Can you recommend some high-quality resources or tutorials for improving my video editing skills on [specific software or platform]?",
        },
      ],
    },
    {
      title: "Personalized Support",
      templates: [
        {
          title: "Content Improvement",
          message:
            "Based on my recent video performance, what specific improvements can I make to enhance my content and better engage my audience?",
        },
        {
          title: "Audience Growth",
          message:
            "I’m aiming to grow my audience on [YouTube/TikTok] and increase my engagement rate. Can you provide tailored advice and strategies to achieve these goals?",
        },
      ],
    },
    {
      title: "General Tips and Best Practices",
      templates: [
        {
          title: "Common Pitfalls",
          message:
            "What are some common pitfalls that content creators face on YouTube/TikTok, and how can I avoid them to ensure my content stands out?",
        },
        {
          title: "Live Streaming and Q&A",
          message:
            "How can I effectively use live streaming or Q&A sessions to boost engagement and build a stronger connection with my audience?",
        },
      ],
    },
    {
      title: "Niche Discovery and Analysis",
      templates: [
        {
          title: "Emerging Niches",
          message:
            "Can you help me identify emerging niches or subcategories within [specific content area] that have potential for growth and are currently underserved?",
        },
        {
          title: "Niche Trends",
          message:
            "What are some niche trends in [content category] that I can explore to create unique and engaging content for my [YouTube/TikTok] audience?",
        },
      ],
    },
    {
      title: "Content Enhancement",
      templates: [
        {
          title: "Video Thumbnails",
          message:
            "What are some best practices for designing eye-catching video thumbnails that will attract viewers and encourage them to click?",
        },
        {
          title: "Audio Quality",
          message:
            "Can you suggest techniques to enhance the audio quality of my recordings and ensure a professional sound for my [YouTube/TikTok] videos?",
        },
      ],
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(templates[0]);

  const handleOnClick = (message: string) => {
    setValue("message", message);
    router.push("/");
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <main className="container py-8">
      <div className="prose mb-4">
        <h2>Templates Library</h2>
      </div>
      <div className="flex gap-4">
        <div className="w-32 md:w-72 flex flex-col items-start">
          {templates.map((category: Category) => (
            <CategoryButton
              key={category.title}
              category={category}
              selectedCategory={selectedCategory}
              handleClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
        <div className="grid flex-1 gap-6 md:grid-cols-2 place-content-start">
          {selectedCategory.templates.map((template) => (
            <TemplateButton
              key={template.title}
              title={template.title}
              message={template.message}
              handleOnClick={handleOnClick}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

interface CategoryButtonProps {
  category: Category;
  selectedCategory: Category;
  handleClick: () => void;
}

function CategoryButton({
  category,
  selectedCategory,
  handleClick,
}: CategoryButtonProps) {
  return (
    <Button
      variant="link"
      onClick={handleClick}
      className={clsx("cursor-pointer", {
        "font-bold": category.title === selectedCategory.title,
      })}
    >
      {category.title}
    </Button>
  );
}

interface TemplateButtonProps {
  title: string;
  message: string;
  handleOnClick: (message: string) => void;
}

function TemplateButton({
  title,
  message,
  handleOnClick,
}: TemplateButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Button
            variant="outline"
            onClick={() => handleOnClick(message)}
            className="w-full py-6 font-bold bg-accent"
          >
            {title}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

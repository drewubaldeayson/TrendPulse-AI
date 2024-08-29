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
import templates from "@/lib/templates.json";

export interface Template {
  title: string;
  message: string;
}

export interface Category {
  title: string;
  templates: Template[];
}

export default function Templates() {
  const { setValue } = useFormContext();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(templates[0]);

  const handleOnClick = (message: string) => {
    setValue("message", message);
    router.push("/chat");
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

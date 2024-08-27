"use client";

import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Templates() {
  const { setValue } = useFormContext();
  const router = useRouter();

  const handleButtonClick = (message: string) => {
    // Set the new value for message
    setValue("message", message);

    // Redirect to homepage
    router.push("/");
  };

  return (
    <main className="container">
      <Button
        variant="outline"
        onClick={() => handleButtonClick("Hello World")}
        className="btn"
      >
        Hello World
      </Button>
    </main>
  );
}

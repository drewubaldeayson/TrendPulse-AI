"use client";
import { auth } from "@/firebase/config";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div className="px-2 sticky top-0 h-16 border bg-primary-foreground flex items-center justify-between">
      <Button variant="ghost">
        <a href="/">
          <span className="font-bold">TrendPulse-AI</span>
        </a>
      </Button>
      <LogoutButton />
    </div>
  );
}

"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        signOut(auth);
        sessionStorage.removeItem("user");
      }}
    >
      Log out
    </Button>
  );
}

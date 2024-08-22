"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button variant="link" onClick={() => signOut(auth)}>
      Log out
    </Button>
  );
}

"use client";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button variant="link" onClick={() => signOut(auth)}>
      Sign Out
    </Button>
  );
}

"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        signOut(auth);
        sessionStorage.removeItem("user");
      }}
    >
      Log out
    </button>
  );
}

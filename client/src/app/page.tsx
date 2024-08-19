"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <main>
      <p>Email: {user?.email}</p>
      <p>Display Name: {user?.displayName}</p>
      <p>UID: {user?.uid}</p>
      <button
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
        }}
      >
        Log out
      </button>
    </main>
  );
}

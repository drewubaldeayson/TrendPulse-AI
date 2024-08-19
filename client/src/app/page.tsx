"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);

  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const getIdTokenAsync = async () => {
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
      }
    };
    getIdTokenAsync();
  }, [user]);

  return (
    <main>
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

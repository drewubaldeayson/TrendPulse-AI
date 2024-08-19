"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

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

  useEffect(() => {
    if (idToken) {
      axios
        .get("http://localhost:5000/healthcheck", {
          headers: {
            Authorization: idToken,
          },
        })
        .then((response) => response.data)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }, [idToken]);

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

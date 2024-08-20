"use client";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function Home() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getIdTokenAsync = async () => {
      if (user) {
        const token = await user.getIdToken();
        axios
          .post(
            "http://localhost:5000/chatgpt",
            { message: "" },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
    getIdTokenAsync();
  }, []);

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

"use client";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, _loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleSignUp = async () => {
    await signInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="App">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign In</button>
    </div>
  );
}

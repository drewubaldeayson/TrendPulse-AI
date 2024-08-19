"use client";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, _loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      setEmail("");
      setPassword("");
      sessionStorage.setItem("user", "true");
    }
  }, [user]);

  return (
    <div>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => signInWithEmailAndPassword(email, password)}>
        Sign In
      </button>
      {error && <p>{error.message}</p>}
      <Link href="/sign-up" className="underline">
        <p>Don't have an account?</p>
      </Link>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, _loading, error] =
    useCreateUserWithEmailAndPassword(auth);

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
      <button onClick={() => createUserWithEmailAndPassword(email, password)}>
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
      <Link href="/sign-in" className="underline">
        <p>Already have an account?</p>
      </Link>
    </div>
  );
}

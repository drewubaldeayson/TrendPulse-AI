"use client";
import { auth } from "@/firebase/config";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

export default function Home() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(sessionStorage.getItem("user"));
  }, []);

  return <main></main>;
}

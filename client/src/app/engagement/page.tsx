"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/config";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaSpinner } from "react-icons/fa6";

interface EngagementData {
  username: string;
  profilePic: string;
  followers: number;
  averageLikes: number;
  averageComments: number;
  engagementRate: number;
}

export default function Engagement() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<EngagementData | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateEngagement = async () => {
    if (!username) return;

    try {
      const token = await user?.getIdToken(true);
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/instagram/${username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching engagement data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      calculateEngagement();
    }
  };

  return (
    <main className="bg-accent">
      <section className="container py-12 min-h-screen prose">
        <h1>Engagement Calculator</h1>
        <div className="flex items-center max-w-md gap-2">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            placeholder="Enter Instagram username"
            onKeyDown={handleKeyDown}
          />
          <Button onClick={calculateEngagement}>Calculate</Button>
        </div>

        <div
          className={clsx("flex gap-2 items-center", {
            "opacity-0": !loading,
          })}
        >
          <FaSpinner className="inline animate-spin" />
          <p className="mb-00">Getting instagram data, Please wait...</p>
        </div>

        {result && !loading && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </section>
    </main>
  );
}

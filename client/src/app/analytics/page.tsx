"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebaseConfig";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaSpinner } from "react-icons/fa6";
import { Top50Data } from "../top50/page";
import { Skeleton } from "@/components/ui/skeleton";

interface EngagementData {
  username: string;
  profilePic: string;
  followers: number;
  averageLikes: number;
  averageComments: number;
  engagementRate: number;
}

export default function Analytics() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<EngagementData | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetches engagement data for the given Instagram user
  const calculateEngagement = async () => {
    if (loading || !username) return; // Avoid unnecessary requests

    try {
      const token = await user?.getIdToken(true); // Get user token
      setLoading(true); // Start loading

      // API call to fetch engagement data
      const response = await axios.get(
        `http://localhost:5000/api/instagram/${username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // Store result
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching engagement data:", error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  return (
    <main className="bg-accent">
      <section className="container flex flex-col min-h-screen gap-4 py-12 prose prose-lg lg:flex-row">
        <div className="lg:w-8/12">
          <h2>Engagement Calculator</h2>
          <EngagementForm
            username={username}
            setUsername={setUsername}
            calculateEngagement={calculateEngagement}
          />

          <EngagementResult loading={loading} result={result} />
        </div>
        <div className="flex-1">
          <TopEngagement />
        </div>
      </section>
    </main>
  );
}
interface EngagementFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  calculateEngagement: () => void;
}

function EngagementForm({
  username,
  setUsername,
  calculateEngagement,
}: EngagementFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      calculateEngagement();
    }
  };

  return (
    <div className="flex items-center w-full gap-2">
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
        placeholder="Enter Instagram username"
        onKeyDown={handleKeyDown}
      />
      <Button onClick={calculateEngagement}>Calculate</Button>
    </div>
  );
}

interface EngagementResultProps {
  result: EngagementData | null;
  loading: boolean;
}

function EngagementResult({ result, loading }: EngagementResultProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <FaSpinner className="inline animate-spin" />
        <p className="mb-00">Getting instagram data, Please wait...</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2">
      <Card className="flex flex-col items-center justify-center p-12 md:col-span-2">
        <div className="flex items-center justify-center w-32 h-32 overflow-hidden rounded-full shadow-lg">
          <Image
            src={result.profilePic}
            alt="profile pic"
            width={128}
            height={128}
            className="transform scale-105 rounded-full"
          />
        </div>
        <h4>
          <b>@{result.username}</b>
        </h4>
      </Card>
      <Card className="p-8">
        <h3 className="mt-0">Engagement Rate</h3>
        <h1>{result.engagementRate.toFixed(2)}%</h1>
      </Card>
      <Card className="p-8">
        <h3 className="mt-0">Average Interactions per post</h3>
        <h4>
          <b>{new Intl.NumberFormat().format(result.followers)}</b> Followers
        </h4>
        <h4>
          <b>
            {new Intl.NumberFormat().format(Math.round(result.averageLikes))}
          </b>{" "}
          likes
        </h4>
        <h4>
          <b>
            {new Intl.NumberFormat().format(Math.round(result.averageComments))}
          </b>{" "}
          comments
        </h4>
      </Card>
    </div>
  );
}

function TopEngagement() {
  const [user] = useAuthState(auth);
  const [topResult, setTopResult] = useState<Top50Data | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetches top engagement data
  const getTopEngagement = async () => {
    try {
      // Get user token
      const token = await user?.getIdToken(true);

      setLoading(true);

      // API call to fetch top Instagram data
      const response = await axios.get(
        `http://localhost:5000/api/top50/instagram`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Store top result
      setTopResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching top engagement data:", error);
    }
  };

  useEffect(() => {
    getTopEngagement();
  }, []);

  if (loading) {
    return (
      <Card className="px-6 h-[80vh] overflow-y-scroll">
        <h4>Top Instagram Accounts This Month</h4>
        <table className="flex flex-col gap-2">
          {[...Array(50)].map((_, index) => (
            <Skeleton key={index} className="w-full h-8" />
          ))}
        </table>
      </Card>
    );
  }

  if (!topResult) return null;

  return (
    <Card className="px-6 h-[80vh] overflow-y-scroll">
      <h4>Top Instagram Accounts This Month</h4>
      <table>
        {topResult.data.length > 0 && (
          <tbody>
            {topResult.data.map((result) => (
              <tr key={result.username}>
                <td>
                  <b>@{result.username}</b>
                </td>
                <td>{result.followers}</td>
                <td>{result.engagementRate}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Card>
  );
}

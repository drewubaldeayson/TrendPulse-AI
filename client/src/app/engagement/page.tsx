"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/config";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
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

interface TopEngagementData {
  lastScraped: string | null;
  data: { username: string; engagementRate: string }[];
}

export default function Engagement() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<EngagementData | null>(null);
  const [topResult, setTopResult] = useState<TopEngagementData | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateEngagement = async () => {
    if (loading || !username) return;

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

  const getTopEngagement = async () => {
    const token = await user?.getIdToken(true);
    const response = await axios.get(`http://localhost:5000/api/topInstagram`, {
      headers: {
        Authorization: token,
      },
    });
    setTopResult(response.data);
  };

  useEffect(() => {
    getTopEngagement();
  }, []);

  return (
    <main className="bg-accent">
      <section className="container flex flex-col min-h-screen py-12 prose prose-lg lg:flex-row gap-4">
        <div className="lg:w-8/12">
          <h2>Engagement Calculator</h2>
          <EngagementForm
            username={username}
            setUsername={setUsername}
            calculateEngagement={calculateEngagement}
          />
          {loading && <EngagementLoading />}
          {result && !loading && <EngagementResult result={result} />}
        </div>
        <div className="flex-1">
          {topResult && <TopEngagement topResult={topResult} />}
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

function EngagementLoading() {
  return (
    <div className="flex items-center gap-2">
      <FaSpinner className="inline animate-spin" />
      <p className="mb-00">Getting instagram data, Please wait...</p>
    </div>
  );
}

function EngagementResult({ result }: { result: EngagementData }) {
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

function TopEngagement({ topResult }: { topResult: TopEngagementData }) {
  return (
    <Card className="px-8 h-[80vh] box-border overflow-y-scroll">
      <h4>Top Instagram Accounts This Month</h4>
      <table>
        {topResult.data.length > 0 && (
          <tbody>
            {topResult.data.map((result) => (
              <tr key={result.username}>
                <td>
                  <b>@{result.username}</b>
                </td>
                <td>{result.engagementRate}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Card>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/firebaseConfig";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { notFound, useSearchParams } from "next/navigation";

export interface Top50Data {
  lastScraped: string | null;
  data: {
    username: string;
    followers: string;
    engagementRate: string;
  }[];
}

export default function Top50() {
  const searchParams = useSearchParams();
  const platform = searchParams.get("p");
  return (
    <main className="min-h-screen bg-accent">
      <div className="container flex flex-col gap-8 py-16">
        <TitleSection platform={platform} />
        <div className="flex gap-4 flex-col md:flex-row">
          <MenuSection />
          <TableSection platform={platform} />
        </div>
      </div>
    </main>
  );
}

function TitleSection({ platform }: { platform: string | null }) {
  return (
    <div className="prose">
      <h2 className="capitalize">Top 50 Followed {platform} Users</h2>
    </div>
  );
}

function TableSection({ platform }: { platform: string | null }) {
  const [user] = useAuthState(auth);
  const [topResult, setTopResult] = useState<Top50Data | null>(null);
  const [loading, setLoading] = useState(true);

  const allowedPlatforms = ["instagram", "tiktok", "twitch"];

  if (!platform || !allowedPlatforms.includes(platform)) {
    return notFound();
  }

  // Fetches top engagement data
  const getTopEngagement = async () => {
    try {
      // Get user token
      const token = await user?.getIdToken(true);

      setLoading(true);

      // API call to fetch top Instagram data
      console.log(platform);

      const response = await axios.get(
        `http://localhost:5000/api/top50/${platform}`,
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
  }, [platform]);

  if (loading) {
    return (
      <Card className="prose flex-1">
        <CardHeader>
          {[...Array(50)].map((_, index) => (
            <Skeleton key={index} className="w-full h-8" />
          ))}
        </CardHeader>
      </Card>
    );
  }

  if (!topResult) return null;

  return (
    <Card className="prose flex-1">
      <CardHeader>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Profile</th>
              <th>Followers</th>
              <th>Engagement Rate</th>
            </tr>
          </thead>
          <tbody>
            {topResult.data.map((result, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>
                  <Link
                    href={`https://instagram.com/${result.username}`}
                    className="no-underline hover:underline"
                  >
                    {result.username}
                  </Link>
                </td>
                <td>{result.followers}</td>
                <td>{result.engagementRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardHeader>
    </Card>
  );
}

function MenuSection() {
  return (
    <Card className="min-w-72 prose prose-sm h-fit">
      <CardHeader>
        <MenuLink
          title="Instagram"
          label="Top 50 Followed Instagram Users"
          href="/top50?p=instagram"
        />
        <MenuLink
          title="Tiktok"
          label="Top 50 Followed Tiktok Users"
          href="/top50?p=tiktok"
        />
        <MenuLink
          title="Twitch"
          label="Top 50 Followed Twitch Users"
          href="/top50?p=twitch"
        />
      </CardHeader>
    </Card>
  );
}

interface MenuLinkProps {
  title: string;
  label: string;
  href: string;
}

function MenuLink({ title, label, href }: MenuLinkProps) {
  return (
    <>
      <h4>{title}</h4>
      <hr />
      <Link href={href}>
        <Button variant="ghost" className="w-full justify-start">
          {label}
        </Button>
      </Link>
    </>
  );
}

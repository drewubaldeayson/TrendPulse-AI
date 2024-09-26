import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Top50Instagram() {
  return (
    <main className="min-h-screen bg-accent">
      <div className="container flex flex-col gap-8 py-16">
        <TitleSection />
        <div className="flex gap-4 flex-col md:flex-row">
          <MenuSection />
          <TableSection />
        </div>
      </div>
    </main>
  );
}

function TitleSection() {
  return (
    <div className="prose">
      <h2>Top 50 Followed Instagram Users</h2>
    </div>
  );
}

function TableSection() {
  const dummyData = [
    {
      username: "instagram",
      followers: "673.6M",
      engagementRate: "0.03%",
    },
    {
      username: "cristiano",
      followers: "632.6M",
      engagementRate: "0.90%",
    },
    {
      username: "leomessi",
      followers: "503.5M",
      engagementRate: "0.67%",
    },
    {
      username: "selenagomez",
      followers: "426.8M",
      engagementRate: "0.66%",
    },
    {
      username: "kyliejenner",
      followers: "399.1M",
      engagementRate: "0.68%",
    },
    {
      username: "therock",
      followers: "397M",
      engagementRate: "0.09%",
    },
    {
      username: "arianagrande",
      followers: "378.7M",
      engagementRate: "0.61%",
    },
    {
      username: "kimkardashian",
      followers: "362.1M",
      engagementRate: "0.25%",
    },
    {
      username: "beyonce",
      followers: "318.2M",
      engagementRate: "0.36%",
    },
    {
      username: "khloekardashian",
      followers: "308.6M",
      engagementRate: "0.00%",
    },
  ];

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
            {dummyData.map((data, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>
                  <Link
                    href={`https://instagram.com/${data.username}`}
                    className="no-underline hover:underline"
                  >
                    {data.username}
                  </Link>
                </td>
                <td>{data.followers}</td>
                <td>{data.engagementRate}</td>
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
    <Card className="min-w-72 prose prose-sm">
      <CardHeader>
        <MenuLink
          title="Instagram"
          label="Top 50 Followed Instagram Users"
          href="/top50/instagram"
        />
        <MenuLink
          title="Facebook"
          label="Top 50 Followed Facebook Users"
          href="/top50/twitch"
        />
        <MenuLink
          title="Tiktok"
          label="Top 50 Followed Tiktok Users"
          href="/top50/tiktok"
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

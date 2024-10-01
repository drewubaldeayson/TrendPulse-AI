import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function CollaborationsPage() {
  return (
    <main className="bg-accent">
      <div className="container min-h-screen py-8">
        <TitleSection />
      </div>
    </main>
  );
}

function TitleSection() {
  const features = [
    {
      title: "✔️ Engagement Calculators",
      description:
        "Unlimited engagement searches for Instagram, TikTok, X(Twitter), Facebook, YouTube, and Twitch",
    },
    {
      title: "✔️ Social Media Auditors",
      description:
        "Unlimited audits for Instagram, TikTok, and YouTube accounts",
    },
    {
      title: "✔️ Brand Mentions",
      description:
        "Unlimited projects and keyword monitoring for the entire web",
    },
    {
      title: "✔️ Influencer Directory",
      description: "Search and contact over 100,000 influencers",
    },
    {
      title: "✔️ Engagement Calculator Manager",
      description: "Create informative lists for your social campaigns",
    },
    {
      title: "✔️ Campaign Manager",
      description: "Manage all your social media campaigns",
    },
    {
      title: "✔️ Competitor Tracker",
      description:
        "Compare statistics of your competitors with simplified graphs",
    },
    {
      title: "✔️ Collaborations",
      description: "Post and respond to other brands and influencers' posts",
    },
    {
      title: "✔️ Contracts",
      description: "Generate unlimited contracts for your influencer campaigns",
    },
    {
      title: "✔️ Dedicated user accounts",
      description: "Unlimited access to Phlanx Complete",
    },
    { title: "✔️ Free 30 days trial", description: "" },
  ];

  return (
    <section className="flex justify-between items-center">
      <div className="prose">
        <h2>Collaborations</h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Collaboration</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm md:max-w-xl">
          <DialogHeader className="items-center">
            <DialogTitle>Oops! You need to be subscribed.</DialogTitle>
            <DialogDescription>
              Sign up for 30 days free trial to get full access.
            </DialogDescription>
          </DialogHeader>

          <Button className="mx-16">
            <Link href="/sign-up">Sign Up Now</Link>
          </Button>

          <div className="prose prose-sm">
            <p>Other features you'll also get full access to:</p>
            {features.map((feature, index) => (
              <p key={index}>
                <b>{feature.title}</b>
                <br />
                {feature.description}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

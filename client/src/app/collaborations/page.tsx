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
  return (
    <section className="flex justify-between items-center">
      <div className="prose">
        <h2>Collaborations</h2>
      </div>
      <CreateCollaborationButton />
    </section>
  );
}

function CreateCollaborationButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Collaboration</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Oops! You need to be subscribed.</DialogTitle>
          <DialogDescription>
            Sign up for 30 days free trial to get full access.
          </DialogDescription>
        </DialogHeader>
        <Link href="/sign-up">
          <Button className="w-fit">Sign Up Now</Button>
        </Link>
        <div className="prose prose-sm">
          <p>
            <b>✔️ Engagement Calculators</b>
            <br />
            Unlimited engagement searches for Instagram, TikTok, X(Twitter),
            Facebook, YouTube, and Twitch
          </p>
          <p>
            <b>✔️ Social Media Auditors</b>
            <br />
            Unlimited audits for Instagram, TikTok, and YouTube accounts
          </p>
          <p>
            <b>✔️ Brand Mentions</b>
            <br />
            Unlimited projects and keyword monitoring for the entire web
          </p>
          <p>
            <b>✔️ Influencer Directory</b>
            <br />
            Search and contact over 100,000 influencers
          </p>
          <p>
            <b>✔️ Engagement Calculator Manager</b>
            <br />
            Create informative lists for your social campaigns
          </p>
          <p>
            <b>✔️ Campaign Manager</b>
            <br />
            Manage all your social media campaigns
          </p>
          <p>
            <b>✔️ Competitor Tracker</b>
            <br />
            Compare statistics of your competitors with simplified graphs
          </p>
          <p>
            <b>✔️ Collaborations</b>
            <br />
            Post and respond to other brands and influencers' posts
          </p>
          <p>
            <b>✔️ Contracts</b>
            <br />
            Generate unlimited contracts for your influencer campaigns
          </p>
          <p>
            <b>✔️ Dedicated user accounts</b>
            <br />
            Unlimited access to Phlanx Complete
          </p>
          <p>
            <b>✔️ Free 30 days trial</b>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

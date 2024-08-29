import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-accent">
      <div className="container py-32 flex">
        <div className="w-1/2 prose">
          <h1 className="font-black text-5xl">
            Chat smarter <br />
            with Trendpulse-AI
          </h1>
          <p>
            Trendpulse-AI is a free AI-powered assistant that combines the power
            of ChatGPT with unique data sources, including the HubSpot CRM, to
            help supercharge your work.
          </p>
          <Link href="/chat">
            <Button>Start chatting free</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

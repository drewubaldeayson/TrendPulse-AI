import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass, FaRegMessage, FaRegUser } from "react-icons/fa6";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-accent">
      <div className="container flex flex-col-reverse items-center gap-4 py-32 h-fit md:flex-row">
        <div className="prose md:w-1/2">
          <h1 className="text-5xl">
            Power Tool for <br />
            Content Creators.
          </h1>
          <p>
            Trendpulse AI is a free AI-powered assistant that combines the power
            of ChatGPT with unique data sources, including the HubSpot CRM, to
            help supercharge your work.
          </p>
          <Link href="/chat">
            <Button>Start chatting free</Button>
          </Link>
        </div>
        <div className="flex-1 hidden md:block">
          <AspectRatio ratio={16 / 9}>
            <Image alt="hero" src="/hero.png" fill className="rounded-md" />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const cards = [
    {
      logo: <FaMagnifyingGlass size={48} />,
      title: "Discover Unique Insights",
      description:
        "Research smarter with prompt templates and unique data sources.",
    },
    {
      logo: <FaRegUser size={48} />,
      title: "Get Intuitive Answers",
      description: "Get intuitive answers designed for you to take action.",
    },
    {
      logo: <FaRegMessage size={48} />,
      title: "Connect with Your Business",
      description:
        "Integrate your HubSpot CRM and talk to your data in real time.",
    },
  ];
  return (
    <section>
      <div className="container py-16 prose">
        <h1 className="text-center">AI that means business</h1>
        <div className="flex flex-col gap-8 md:flex-row">
          {cards.map((card) => (
            <Card key={card.title} className="py-4">
              <CardHeader className="items-center text-center">
                <span className="mb-4">{card.logo}</span>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

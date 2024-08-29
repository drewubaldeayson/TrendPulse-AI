import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass, FaRegMessage, FaRegUser } from "react-icons/fa6";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ApplicationsSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-accent">
      <div className="container flex flex-col-reverse items-center gap-8 py-32 h-fit md:flex-row">
        <div className="w-full prose md:w-1/2">
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
        <div className="w-full md:w-1/2">
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
      <div className="container py-24 prose">
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

function ApplicationsSection() {
  return (
    <section className="bg-accent">
      <div className="container px-16 py-24 prose">
        <h1 className="text-center">Trendpulse AI In Action</h1>
        <div className="flex flex-col gap-16">
          <ApplicationItem
            title="Accelerated Sales Prospecting"
            description="Draft blog posts & tweets, create AI generated images, and enjoy your in-house editor. ChatSpot is here to make content creation easier than ever."
            imageSrc="/hero.png"
            buttonHref="/chat"
            buttonText="Start chatting free"
          />
          <ApplicationItem
            title="Integrated Content Generation"
            description="Draft blog posts & tweets, create AI generated images, and enjoy your in-house editor. ChatSpot is here to make content creation easier than ever."
            imageSrc="/hero.png"
            buttonHref="/chat"
            buttonText="Start chatting free"
            reverse
          />
          <ApplicationItem
            title="Deep Insights"
            description="Knowledge is power. ChatSpot helps you dive deep into company data like funding rounds, locations, and technologies used."
            imageSrc="/hero.png"
            buttonHref="/chat"
            buttonText="Start chatting free"
          />
        </div>
      </div>
    </section>
  );
}

interface ApplicationItemProps {
  title: string;
  description: string;
  imageSrc: string;
  buttonHref: string;
  buttonText: string;
  reverse?: boolean;
}

function ApplicationItem({
  title,
  description,
  imageSrc,
  buttonHref,
  buttonText,
  reverse = false,
}: ApplicationItemProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-8",
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      <div className="w-full md:w-1/2">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href={buttonHref}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
      <div className="w-full md:w-1/2">
        <AspectRatio ratio={16 / 9}>
          <Image alt="hero" src={imageSrc} fill className="rounded-md" />
        </AspectRatio>
      </div>
    </div>
  );
}

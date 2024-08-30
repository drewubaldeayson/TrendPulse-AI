"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass, FaRegMessage, FaRegUser } from "react-icons/fa6";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ApplicationsSection />
      <CapabilitiesSection />
      <FooterSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="bg-accent">
      <div className="container flex flex-col-reverse items-center gap-8 py-32 h-fit md:flex-row">
        <div className="w-full prose md:w-1/2">
          <h1 className="text-5xl text-balance">
            Power Tool for Content Creators.
          </h1>
          <p className="text-balance">
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
    <section className="bg-primary-foreground">
      <div className="container py-24 prose">
        <h1 className="text-center">AI that means business</h1>
        <div className="flex flex-col gap-8 md:flex-row">
          {cards.map((card) => (
            <Card key={card.title} className="py-4">
              <CardHeader className="items-center text-center text-balance">
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
  const applications = [
    {
      title: "Accelerated Sales Prospecting",
      description:
        "Draft blog posts & tweets, create AI generated images, and enjoy your in-house editor. ChatSpot is here to make content creation easier than ever.",
      imageSrc: "/hero.png",
      buttonHref: "/chat",
      buttonText: "Start chatting free",
    },
    {
      title: "Integrated Content Generation",
      description:
        "Draft blog posts & tweets, create AI generated images, and enjoy your in-house editor. ChatSpot is here to make content creation easier than ever.",
      imageSrc: "/hero.png",
      buttonHref: "/chat",
      buttonText: "Start chatting free",
      reverse: true,
    },
    {
      title: "Deep Insights",
      description:
        "Knowledge is power. ChatSpot helps you dive deep into company data like funding rounds, locations, and technologies used.",
      imageSrc: "/hero.png",
      buttonHref: "/chat",
      buttonText: "Start chatting free",
    },
  ];

  return (
    <section className="bg-accent">
      <div className="container px-16 py-24 prose text-balance">
        <h1 className="text-center">Trendpulse AI In Action</h1>
        <div className="flex flex-col gap-16">
          {applications.map((app, index) => (
            <ApplicationItem
              key={index}
              title={app.title}
              description={app.description}
              imageSrc={app.imageSrc}
              buttonHref={app.buttonHref}
              buttonText={app.buttonText}
              reverse={app.reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const capabilities = [
    {
      title: "CRM Command Line",
      description:
        "Add contacts, create tasks, notes, and so much more. Move through your to-do-list with natural language.",
      imageSrc: "/hero.png",
    },
    {
      title: "CRM Summaries",
      description:
        "Use TrendPulse AI to instantly summarize your CRM data, making it easier than ever to get a birds-eye-view of your CRM.",
      imageSrc: "/hero.png",
    },
    {
      title: "CRM Analyst",
      description:
        "TrendPulse AI can help you understand your company performance in just a sentence. Ask Trendpulse AI for a bar chart of results, and you'll get results faster than any reporting product on the planet.",
      imageSrc: "/hero.png",
    },
    {
      title: "CRM Optimizer",
      description:
        "TrendPulse AI can help you optimize your CRM data to get the most out of your sales pipeline. Trendpulse AI can help you do that with a few clicks.",
      imageSrc: "/hero.png",
    },
  ];
  return (
    <section className="bg-primary-foreground">
      <div className="container px-16 py-24 prose">
        <h1 className="text-center">Better with TrendPulse AI</h1>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {capabilities.map((capability) => (
              <CapabilityItem
                key={capability.title}
                title={capability.title}
                description={capability.description}
                imageSrc={capability.imageSrc}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="flex items-center justify-between h-16 px-4 border-t bg-primary-foreground">
      <p className="w-full text-center opacity-50">
        &copy; {new Date().getFullYear()} TrendPulse AI. All rights reserved.
      </p>
    </footer>
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
        "flex flex-col-reverse gap-8",
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
          <Image alt="application" src={imageSrc} fill className="rounded-md" />
        </AspectRatio>
      </div>
    </div>
  );
}

interface CapabilityItemProps {
  title: string;
  description: string;
  imageSrc: string;
}

function CapabilityItem({ title, description, imageSrc }: CapabilityItemProps) {
  return (
    <CarouselItem className="flex flex-col-reverse justify-center gap-8 md:px-24 md:flex-row">
      <div className="w-full md:w-1/2">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="w-full md:w-1/2">
        <AspectRatio ratio={16 / 9}>
          <Image alt="capability" src={imageSrc} fill className="rounded-md" />
        </AspectRatio>
      </div>
    </CarouselItem>
  );
}

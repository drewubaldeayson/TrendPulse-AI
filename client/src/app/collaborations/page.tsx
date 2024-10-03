"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import clsx from "clsx";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

export default function CollaborationsPage() {
  return (
    <main className="bg-accent">
      <div className="container flex flex-col min-h-screen gap-8 py-8">
        <TitleSection />
        <div className="flex flex-col gap-4 lg:flex-row">
          <SidePanel />
          <ContentPanel />
        </div>
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
    <section className="flex items-center justify-between">
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

          <div className="prose-sm prose">
            <p>Other features you'll also get full access to:</p>
            {features.map((feature, index) => (
              <p key={index}>
                <b>{feature.title}</b>
                <br />
                <span className="hidden md:inline">{feature.description}</span>
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function SidePanel() {
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const [checkedLocation, setCheckedLocation] = useState<string>("None");

  console.log(checkedLocation);

  return (
    <Card className="min-w-72">
      <CardHeader>
        <div className="prose-sm prose">
          <h3>Filter</h3>
          <hr className="my-4" />
          <Input placeholder="Search" />
          <CategoriesList
            checkedCategories={checkedCategories}
            setCheckedCategories={setCheckedCategories}
          />
          <LocationList setCheckedLocation={setCheckedLocation} />
        </div>
      </CardHeader>
    </Card>
  );
}

interface CategoriesListProps {
  checkedCategories: string[];
  setCheckedCategories: Dispatch<SetStateAction<string[]>>;
}

function CategoriesList({
  checkedCategories,
  setCheckedCategories,
}: CategoriesListProps) {
  const categories = [
    "Beauty",
    "Beverage",
    "Business",
    "Entertainment",
    "Family",
    "Fashion",
    "Fitness",
    "Food",
    "Health",
    "Home",
    "Lifestyle",
    "Technology",
    "Other",
  ];
  const handleCheckboxChange = (category: string, checked: boolean) => {
    if (checked) {
      // Add the category to the list if checked
      setCheckedCategories((prev) => [...prev, category]);
    } else {
      // Remove the category from the list if unchecked
      setCheckedCategories((prev) =>
        prev.filter((checkedCategory) => checkedCategory !== category)
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h4>Categories</h4>
      {categories.map((category) => (
        <div key={category} className="items-center flex gap-2">
          <Checkbox
            id={category}
            checked={checkedCategories.includes(category)}
            onCheckedChange={(checked) =>
              handleCheckboxChange(category, !!checked)
            }
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </div>
  );
}

interface LocationListProps {
  setCheckedLocation: Dispatch<SetStateAction<string>>;
}

function LocationList({ setCheckedLocation }: LocationListProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4>Location</h4>
      <Select onValueChange={setCheckedLocation}>
        <SelectTrigger>
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="None">Select a location</SelectItem>
          <SelectItem value="United States">United States</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function ContentPanel() {
  const dummyData = [
    {
      id: 1,
      name: "Jennifer Maldonado",
      date: 1695945600,
      company: "Jennifer Maldonado",
      contact: "Jennifer Maldonado",
      location: ["US"],
      link: "https://example.com/jennifer",
      reimbursement: "Paid",
      budget: 100,
      type: "I'm an influencer looking for...",
      description:
        "Jennifer Maldonado is a vibrant US-based influencer with a growing community of 36k followers. She captivates her audience by blending product showcases with heartfelt glimpses into her life with her family.",
      email: "jennifer@example.com",
    },
    {
      id: 2,
      name: "Kris PR",
      date: 1690848000,
      company: "Kris PR",
      contact: "Kris PR",
      location: ["US", "UK", "AU"],
      link: null,
      reimbursement: "Paid",
      budget: 0,
      type: "Brand to Brand Collaboration",
      description:
        "Kellog Company is bringing more snacks to sporting events. For large partnership requests or collaborations, contact Kris PR.",
      email: "kris@kellogs.com",
    },
    {
      id: 3,
      name: "Mehmet",
      date: 1690848000,
      company: "Tuiste LLC",
      contact: "Mehmet",
      location: ["US"],
      link: "https://example.com/tuiste",
      reimbursement: "Paid",
      budget: 200,
      type: "I'm an influencer looking for...",
      description:
        "Tuiste LLC specializes in personalized name puzzles for babies. Mehmet seeks collaboration with influencers to promote these products.",
      email: "mehmet@tuiste.com",
    },
    {
      id: 4,
      name: "Jeremie Dende",
      date: 1696118400,
      company: "Hidden",
      contact: "Jeremie Dende",
      location: ["BE", "FR", "DE", "NL", "UK", "CH"],
      link: "https://example.com/afrofest",
      reimbursement: "Free Product",
      budget: null,
      type: "Sponsorships",
      description:
        "A four-day festival in Val d'Isère in April 2025, celebrating culture, adventure, and entertainment.",
      email: "jeremie@hidden.com",
    },
    {
      id: 5,
      name: "Sophia Sterling",
      date: 1695945600,
      company: "Waist Shakers",
      contact: "Sophia Sterling",
      location: ["US"],
      link: "https://example.com/shakeitoff",
      reimbursement: "Free Product",
      budget: null,
      type: "I'm offering product or service in exchange for...",
      description:
        "Earn 20% commission through a unique referral link as part of a campaign with over 40 million reach.",
      email: "sophia@waistshakers.com",
    },
  ];

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="prose-sm prose">
        <h3>Most Recent Paid</h3>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {dummyData.map((post) => {
          const date = new Date(post.date * 1000);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          return (
            <Card key={post.id}>
              <CardHeader>
                <div className="prose-sm prose">
                  <h4>{post.name}</h4>
                  <p className="m-0 text-sm opacity-75">{formattedDate}</p>
                  <hr className="my-2" />
                  <p>
                    <b>Company: </b>
                    {post.company}
                    <br />
                    <b>Contact: </b>
                    {post.contact}
                    <br />
                    <b>Location: </b>
                    {post.location.join(", ")}
                    <br />
                    <b>Reimbursement: </b>
                    {post.reimbursement}
                    <br />
                    <span className={clsx({ hidden: post.budget === null })}>
                      <b>Budget: </b>
                      {post.budget}$
                    </span>
                  </p>
                  <p className="p-2 rounded shadow bg-accent">{post.type}</p>
                  <p>{post.description}</p>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

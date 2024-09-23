import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";

const monthlyPlans = [
  {
    title: "BASIC",
    price: "$29/mo",
    billingInfo: null,
    features: [
      "1 dedicated user account",
      "Unlimited access to Phlanx Complete",
      "Complete suite of marketing tools",
    ],
    buttonLabel: "Start Free Trial",
  },
  {
    title: "PREMIUM",
    price: "$50/mo",
    billingInfo: null,
    features: [
      "3 dedicated user accounts",
      "Unlimited access to Phlanx Complete",
      "Complete suite of marketing tools",
    ],
    buttonLabel: "Start Free Trial",
  },
  {
    title: "BUSINESS",
    price: "$80/mo",
    billingInfo: null,
    features: [
      "8 dedicated user accounts",
      "Unlimited access to Phlanx Complete",
      "Complete suite of marketing tools",
    ],
    buttonLabel: "Start Free Trial",
  },
];

const yearlyPlans = [
  {
    title: "BASIC",
    price: "$28.17/mo",
    billingInfo: "Billed annually for $338 (less $10)",
    features: [
      "1 dedicated user account",
      "Unlimited access to Phlanx Complete",
      "Complete suite of marketing tools",
    ],
    buttonLabel: "Start Free Trial",
  },
  {
    title: "PREMIUM",
    price: "$49.17/mo",
    billingInfo: "Billed annually for $590 (less $10)",
    features: [
      "3 dedicated user accounts",
      "Unlimited access to Phlanx Complete",
      "Complete suite of marketing tools",
    ],
    buttonLabel: "Start Free Trial",
  },
  {
    title: "BUSINESS",
    price: "$79.17/mo",
    billingInfo: "Billed annually for $950 (less $10)",
    features: [
      "8 dedicated user accounts",
      "Unlimited access to Phlanx Complete",
      "Complete suite of marketing tools",
    ],
    buttonLabel: "Start Free Trial",
  },
];

export default function Pricing() {
  return (
    <main className="relative bg-accent">
      <div className="absolute inset-0 transform skew-y-6 -translate-y-3/4 md:-translate-y-1/2 bg-primary"></div>
      <div className="container relative min-h-screen py-16">
        <div className="py-16 prose">
          <h1 className="text-center text-balance text-primary-foreground">
            Select your plan to start your free trial.
          </h1>
        </div>
        <Tabs defaultValue="monthly" className="flex flex-col">
          <TabsList className="self-center">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="my-4">
            <PlanGrid plans={monthlyPlans} />
          </TabsContent>
          <TabsContent value="yearly" className="my-4">
            <PlanGrid plans={yearlyPlans} />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end prose-sm prose opacity-75">
          <p>*All prices in USD</p>
        </div>
      </div>
    </main>
  );
}

interface PlanCardProps {
  title: string;
  price: string;
  billingInfo: string | null;
  features: string[];
  buttonLabel: string;
  className?: string;
}

function PlanCard({
  title,
  price,
  billingInfo,
  features,
  buttonLabel,
  className,
}: PlanCardProps) {
  return (
    <Card className={`prose py-8 ${className}`}>
      <CardHeader className="flex flex-col items-center">
        <h1>{title}</h1>
        <h2>{price}</h2>
        <i className={billingInfo ? "" : "opacity-0"}>{billingInfo || "N/A"}</i>
        <Button>{buttonLabel}</Button>
      </CardHeader>
      <CardContent className="prose-sm">
        {features.map((feature, index) => (
          <p key={index}>✔️ {feature}</p>
        ))}
      </CardContent>
    </Card>
  );
}

interface PlanGridProps {
  plans: PlanCardProps[];
}

function PlanGrid({ plans }: PlanGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {plans.map((plan, index) => (
        <PlanCard key={index} {...plan} />
      ))}
    </div>
  );
}

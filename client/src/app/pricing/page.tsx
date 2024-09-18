import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pricing() {
  const monthlyPlans = [
    {
      title: "BASIC",
      price: "$49/mo",
      billingInfo: "Billed annually",
      features: [
        "1 dedicated user account",
        "Unlimited access to Phlanx Complete",
        "Complete suite of marketing tools",
      ],
      buttonLabel: "Start Free Trial",
    },
    {
      title: "PREMIUM",
      price: "$49/mo",
      billingInfo: "Billed annually",
      features: [
        "3 dedicated user accounts",
        "Unlimited access to Phlanx Complete",
        "Complete suite of marketing tools",
      ],
      buttonLabel: "Start Free Trial",
    },
    {
      title: "BUSINESS",
      price: "$100/mo",
      billingInfo: "Billed annually",
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
      price: "$39/mo",
      billingInfo: "Billed annually for $468",
      features: [
        "1 dedicated user account",
        "Unlimited access to Phlanx Complete",
        "Complete suite of marketing tools",
      ],
      buttonLabel: "Start Free Trial",
    },
    {
      title: "PREMIUM",
      price: "$60/mo",
      billingInfo: "Billed annually for $720",
      features: [
        "3 dedicated user accounts",
        "Unlimited access to Phlanx Complete",
        "Complete suite of marketing tools",
      ],
      buttonLabel: "Start Free Trial",
    },
    {
      title: "BUSINESS",
      price: "$90/mo",
      billingInfo: "Billed annually for $1080",
      features: [
        "8 dedicated user accounts",
        "Unlimited access to Phlanx Complete",
        "Complete suite of marketing tools",
      ],
      buttonLabel: "Start Free Trial",
    },
  ];

  return (
    <main className="bg-accent">
      <div className="container min-h-screen py-32">
        <div className="prose">
          <h1 className="text-center text-balance">
            Select your plan to start your free trial.
          </h1>
        </div>
        <Tabs defaultValue="monthly">
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {monthlyPlans.map((plan, index) => (
                <PlanCard key={index} {...plan} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yearlyPlans.map((plan, index) => (
                <PlanCard key={index} {...plan} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

interface PlanCardProps {
  title: string;
  price: string;
  billingInfo: string;
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
    <Card className={`prose prose-sm ${className}`}>
      <CardHeader className="flex flex-col items-center">
        <h1>{title}</h1>
        <h2>{price}</h2>
        <i>{billingInfo}</i>
        <Button>{buttonLabel}</Button>
      </CardHeader>
      <CardContent>
        {features.map((feature, index) => (
          <p key={index}>✔️ {feature}</p>
        ))}
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";

export default function Pricing() {
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
              <Card className="prose prose-sm">
                <CardHeader className="flex flex-col items-center">
                  <h1>BASIC</h1>
                  <h2>$49/mo</h2>
                  <i className="opacity-0">Billed annually</i>
                  <Button>Start Free Trial</Button>
                </CardHeader>
                <CardContent>
                  <p>✔️ 1 dedicated user account</p>
                  <p>✔️ Unlimited access to Phlanx Complete</p>
                  <p>✔️ Complete suite of marketing tools</p>
                </CardContent>
              </Card>
              <Card className="prose prose-sm">
                <CardHeader className="flex flex-col items-center">
                  <h1>PREMIUM</h1>
                  <h2>$49/mo</h2>
                  <i className="opacity-0">Billed annually</i>
                  <Button className="w-fit">Start Free Trial</Button>
                </CardHeader>
                <CardContent>
                  <p>✔️ 3 dedicated user accounts</p>
                  <p>✔️ Unlimited access to Phlanx Complete</p>
                  <p>✔️ Complete suite of marketing tools</p>
                </CardContent>
              </Card>
              <Card className="prose prose-sm">
                <CardHeader className="flex flex-col items-center">
                  <h1>BUSINESS</h1>
                  <h2>$100/mo</h2>
                  <i className="opacity-0">Billed annually</i>
                  <Button>Start Free Trial</Button>
                </CardHeader>
                <CardContent>
                  <p>✔️ 8 dedicated user accounts</p>
                  <p>✔️ Unlimited access to Phlanx Complete</p>
                  <p>✔️ Complete suite of marketing tools</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="yearly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="prose prose-sm">
                <CardHeader className="flex flex-col items-center">
                  <h1>BASIC</h1>
                  <h2>$39/mo</h2>
                  <i>Billed annually for $468</i>
                  <Button>Start Free Trial</Button>
                </CardHeader>
                <CardContent>
                  <p>✔️ 1 dedicated user account</p>
                  <p>✔️ Unlimited access to Phlanx Complete</p>
                  <p>✔️ Complete suite of marketing tools</p>
                </CardContent>
              </Card>
              <Card className="prose prose-sm">
                <CardHeader className="flex flex-col items-center">
                  <h1>PREMIUM</h1>
                  <h2>$60/mo</h2>
                  <i>Billed annually for $720</i>
                  <Button>Start Free Trial</Button>
                </CardHeader>
                <CardContent>
                  <p>✔️ 3 dedicated user accounts</p>
                  <p>✔️ Unlimited access to Phlanx Complete</p>
                  <p>✔️ Complete suite of marketing tools</p>
                </CardContent>
              </Card>
              <Card className="prose prose-sm">
                <CardHeader className="flex flex-col items-center">
                  <h1>BUSINESS</h1>
                  <h2>$90/mo</h2>
                  <i>Billed annually for $1080</i>
                  <Button>Start Free Trial</Button>
                </CardHeader>
                <CardContent>
                  <p>✔️ 8 dedicated user accounts</p>
                  <p>✔️ Unlimited access to Phlanx Complete</p>
                  <p>✔️ Complete suite of marketing tools</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

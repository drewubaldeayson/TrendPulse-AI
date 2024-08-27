import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import templates from "@/lib/templates.json";
import { Category } from "@/app/templates/page";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function MessageHeader() {
  const [user] = useAuthState(auth);
  return (
    <section>
      <h2 className="leading-normal md:text-4xl">
        Hello, {user?.displayName} <br />
        How can I help you today?
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {templates.map((category: Category) => (
          <Card
            className="transition cursor-pointer hover:bg-primary-foreground"
            onClick={() => console.log(category)}
          >
            <CardHeader>
              <CardTitle className="text-xl">{category.title}</CardTitle>
              <CardDescription>{category.templates[0].message}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

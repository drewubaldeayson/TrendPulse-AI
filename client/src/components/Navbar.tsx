import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="px-2 sticky top-0 h-16 border bg-primary-foreground flex items-center justify-between">
      <Button variant="ghost">
        <a href="/">
          <span className="font-bold">TrendPulse-AI</span>
        </a>
      </Button>
      <LogoutButton />
    </div>
  );
}

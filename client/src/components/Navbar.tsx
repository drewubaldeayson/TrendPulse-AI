"use client";
import { auth } from "@/firebase/config";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { FaCaretDown } from "react-icons/fa6";
import { User } from "firebase/auth";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div className="px-2 sticky top-0 h-16 border bg-primary-foreground flex items-center justify-between">
      <Logo />
      <div className="flex gap-4">
        <NavMenu />
        <Dropdown user={user} />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Button variant="ghost">
      <a href="/">
        <span className="font-bold">TrendPulse-AI</span>
      </a>
    </Button>
  );
}

function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Chat
            </NavigationMenuLink>
          </Link>
          <Link href="/templates" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Templates
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface DropdownProps {
  user: User;
}

function Dropdown({ user }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <span className="mr-1">{user.displayName}</span>
          <FaCaretDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

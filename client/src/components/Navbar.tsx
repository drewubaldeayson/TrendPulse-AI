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

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-2 border bg-primary-foreground">
      <Logo />
      {user ? <AuthorizedMenu user={user} /> : <UnauthorizedMenu />}
    </nav>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Button variant="ghost">
        <span className="md:text-xl font-black">TrendPulse AI</span>
      </Button>
    </Link>
  );
}

function UnauthorizedMenu() {
  return (
    <div className="flex gap-4 pr-2">
      <Link href="/sign-in">
        <Button variant="outline">Login</Button>
      </Link>
    </div>
  );
}

function AuthorizedMenu({ user }: { user: User }) {
  return (
    <div className="flex pr-2 md:gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/chat" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Chat
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/templates" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Templates
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Dropdown user={user} />
    </div>
  );
}
function Dropdown({ user }: { user: User }) {
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

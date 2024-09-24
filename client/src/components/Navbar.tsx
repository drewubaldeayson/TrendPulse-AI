"use client";
import { auth } from "@/lib/firebaseConfig";
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
import { FaBars, FaCaretDown } from "react-icons/fa6";
import { User } from "firebase/auth";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const unauthorizedLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/sign-in", label: "Sign In" },
  ];

  const authorizedLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/chat", label: "Chat" },
    { href: "/templates", label: "Templates" },
    { href: "/analytics", label: "Analytics" },
  ];

  if (!user) {
    return (
      <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-2 border bg-primary-foreground">
        <Logo />
        <div className="flex flex-row-reverse gap-2 md:flex-row">
          <ResponsiveMenu links={unauthorizedLinks} />
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-2 border bg-primary-foreground">
      <Logo />
      <div className="flex flex-row-reverse gap-2 md:flex-row">
        <ResponsiveMenu links={authorizedLinks} />
        <Dropdown user={user} />
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Button variant="ghost">
        <span className="text-xl font-black">TrendPulse AI</span>
      </Button>
    </Link>
  );
}

interface ResponsiveMenuProps {
  links: { href: string; label: string }[];
}

function ResponsiveMenu({ links }: ResponsiveMenuProps) {
  return (
    <div className="flex items-center">
      <div className="hidden md:flex">
        {links.map((link, idx) => (
          <Link key={idx} href={link.href}>
            <Button variant="ghost">{link.label}</Button>
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <FaBars />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="my-4 prose">
              <h4>Navigation</h4>
            </div>
            <div className="flex flex-col">
              {links.map((link, index) => (
                <SheetClose asChild key={index}>
                  <Link key={index} href={link.href}>
                    <Button variant="link" className="text-base">
                      {link.label}
                    </Button>
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
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

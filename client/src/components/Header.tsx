"use client";

import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isAuthenticated = !!sessionStorage.getItem("user");

  if (isAuthPage || !isAuthenticated) {
    return null;
  }

  return (
    <header>
      <LogoutButton />
    </header>
  );
}

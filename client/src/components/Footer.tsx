"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const footerExcludedPaths = ["/sign-in", "/sign-up", "/templates", "/chat"];

  if (footerExcludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="flex items-center justify-between h-16 px-4 border-t bg-primary-foreground">
      <p className="w-full text-center opacity-50">
        &copy; {new Date().getFullYear()} TrendPulse AI. All rights reserved.
      </p>
    </footer>
  );
}

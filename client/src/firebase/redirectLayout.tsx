"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";

export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // If still loading, do nothing
    if (loading) return;

    // Check if current path is for sign-in/sign-up
    const isAuthPath = pathname === "/sign-in" || pathname === "/sign-up";
    // Check if current path requires authentication
    const isProtectedPath = !isAuthPath && pathname !== "/";

    if (user && isAuthPath) {
      // Redirect logged-in users away from sign-in/sign-up pages
      router.push("/chat");
    } else if (!user && isProtectedPath) {
      // Redirect unauthenticated users away from protected pages
      router.push("/sign-in");
    } else {
      // No redirection needed, allow rendering children
      setRedirecting(false);
    }
  }, [loading, user, pathname, router]);

  // Return nothing while redirecting or loading
  if (redirecting || loading) return null;

  // Render children if no redirection is needed
  return <>{children}</>;
}

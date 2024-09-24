"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/config";
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
    if (loading) return;

    const authPaths = ["/sign-in", "/sign-up"];
    const protectedPaths = ["/chat", "/templates", "/analytics"];

    const isAuthPath = authPaths.includes(pathname);
    const isHomePath = pathname === "/";

    const isProtectedPath =
      !isAuthPath && !isHomePath && protectedPaths.includes(pathname);

    if (user && isAuthPath) {
      router.push("/"); // Redirect logged-in users
    } else if (!user && isProtectedPath) {
      router.push("/sign-in"); // Redirect unauthenticated users
    } else {
      setRedirecting(false); // No redirection
    }
  }, [loading, user, pathname, router]);

  // Return nothing while redirecting or loading
  if (redirecting || loading) return null;

  return <>{children}</>;
}

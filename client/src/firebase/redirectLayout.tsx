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
    // Only run the redirect logic when loading is complete
    if (loading) {
      return;
    }

    const isAuthPath = pathname === "/sign-in" || pathname === "/sign-up";
    const isProtectedPath = !isAuthPath && pathname !== "/";

    if (user && isAuthPath) {
      // User is logged in but trying to access sign-in or sign-up
      router.push("/chat");
    } else if (!user && isProtectedPath) {
      // User is not logged in and trying to access a protected path
      router.push("/sign-in");
    } else {
      // No redirection needed
      setRedirecting(false);
    }
  }, [loading, user, pathname, router]);

  // Prevent rendering children while redirecting or loading
  if (redirecting || loading) {
    return null;
  }

  return <>{children}</>;
}

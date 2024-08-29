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
    const handleRedirect = () => {
      const isAuthPath = pathname === "/sign-in" || pathname === "/sign-up";
      const isProtectedPath = !isAuthPath && pathname !== "/";

      if (user && isAuthPath) {
        setRedirecting(true);
        router.push("/chat");
        return;
      }
      if (!user && isProtectedPath) {
        setRedirecting(true);
        router.push("/sign-in");
        return;
      }
      setRedirecting(false);
    };
    handleRedirect();
  }, [loading, user, pathname]);

  // Prevent rendering children while redirecting or loading
  if (redirecting || loading) {
    return null;
  }

  return <>{children}</>;
}

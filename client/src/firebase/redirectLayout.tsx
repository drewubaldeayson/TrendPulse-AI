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
    const handleRedirect = async () => {
      if (loading) return;

      if (user && (pathname === "/sign-in" || pathname === "/sign-up")) {
        router.push("/");
      } else if (!user && pathname !== "/sign-in" && pathname !== "/sign-up") {
        router.push("/sign-in");
      } else {
        setRedirecting(false); // Stop redirecting if no action is taken
      }
    };

    handleRedirect();
  }, [loading, user, pathname, router]);

  // Prevent rendering while redirecting or loading
  if (loading || redirecting) {
    return null;
  }

  // Render the children when everything is fine
  return <>{children}</>;
}

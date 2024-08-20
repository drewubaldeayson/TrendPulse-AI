"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import LogoutButton from "@/components/LogoutButton";

export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const userSession =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  useEffect(() => {
    const authenticate = async () => {
      const isOnAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
      const isAuthenticated = !!user || !!userSession;

      if (user && !userSession) {
        sessionStorage.setItem("user", await user.getIdToken());
      }

      if (isAuthenticated && isOnAuthPage) {
        router.push("/");
      } else if (!isAuthenticated && !isOnAuthPage) {
        router.push("/sign-in");
      }
    };

    authenticate();
  }, [user, userSession, pathname, router]); // No authChecked dependency

  if (loading) {
    return <p className="hidden">Loading...</p>;
  }

  // If the user is not authenticated and is not on the auth page, redirect
  const isOnAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isAuthenticated = !!user || !!userSession;

  if (!isAuthenticated && !isOnAuthPage) {
    router.push("/sign-in");
    return null; // Prevents rendering of children while redirecting
  }

  return (
    <>
      {user && <LogoutButton />}
      {children}
    </>
  );
}

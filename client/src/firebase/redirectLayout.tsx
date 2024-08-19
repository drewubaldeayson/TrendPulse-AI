"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const userSession = sessionStorage.getItem("user");

  useEffect(() => {
    const isOnAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
    const isAuthenticated = user || userSession;

    if (isAuthenticated && isOnAuthPage) {
      router.push("/");
    } else if (!isAuthenticated && !isOnAuthPage) {
      router.push("/sign-in");
    }
  }, [user, pathname, userSession]);

  return <>{children}</>;
}

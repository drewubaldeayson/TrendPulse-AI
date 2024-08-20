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
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const userSession =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  useEffect(() => {
    const authenticate = async () => {
      const isOnAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
      const isAuthenticated = user || userSession;

      if (!userSession && user) {
        sessionStorage.setItem("user", await user.getIdToken());
      }
      if (isAuthenticated && isOnAuthPage) {
        router.push("/");
      } else if (!isAuthenticated && !isOnAuthPage) {
        router.push("/sign-in");
      }
    };
    authenticate();
  }, [user, userSession]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}

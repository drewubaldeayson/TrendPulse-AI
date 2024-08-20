"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { useEffect } from "react";

export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  // Retrieve the session token from sessionStorage
  const userSession =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  // Define whether the user is authenticated or not
  const isAuthenticated = !!user || !!userSession;

  // Define whether the current page is an authentication page (sign-in or sign-up)
  const isOnAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  useEffect(() => {
    // Store the user token in sessionStorage if logged in and session not yet stored
    if (user && !userSession) {
      user.getIdToken().then((token) => sessionStorage.setItem("user", token));
    }
  }, [user, userSession]);

  // Prevent rendering when loading
  if (loading) {
    return null;
  }

  // Redirect authenticated users away from the auth pages
  if (isAuthenticated && isOnAuthPage) {
    router.push("/");
    return null; // Prevent rendering children during redirect
  }

  // Redirect unauthenticated users trying to access non-auth pages
  if (!isAuthenticated && !isOnAuthPage) {
    router.push("/sign-in");
    // Prevent rendering children during redirect
    return null;
  }

  // Render the children when everything is fine
  return <>{children}</>;
}

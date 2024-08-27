import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import RedirectLayout from "@/firebase/RedirectLayout";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TrendPulse-AI",
  description: "TrendPulse-AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        <RedirectLayout>{children}</RedirectLayout>
      </body>
    </html>
  );
}

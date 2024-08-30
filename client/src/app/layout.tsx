import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import RedirectLayout from "@/firebase/RedirectLayout";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import FormProvider from "@/components/FormProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TrendPulse AI",
  description: "TrendPulse AI",
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
        <RedirectLayout>
          <Navbar />
          <FormProvider>{children}</FormProvider>
        </RedirectLayout>
      </body>
    </html>
  );
}

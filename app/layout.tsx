import React from "react";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthButton from "@/components/AuthButton";

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://pawmingle.org";

export const metadata = {
  metadataBase: "https://pawmingle.com",
  title: "Paw Mingle - Pet Adoption Made Easy",
  description:
    "Join Paw Mingle, a loving community dedicated to making pet adoption seamless. Find your forever friend today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Navbar className="">
            <AuthButton />
          </Navbar>
          {children}
        </main>
      </body>
    </html>
  );
}

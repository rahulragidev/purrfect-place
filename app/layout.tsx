import React from "react";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthButton from "@/components/AuthButton";

export const metadata = {
  metadataBase: "https://pawmingle.com",
  title: "Paw Mingle - Pet Adoption Made Easy",
  description:
    "Join Paw Mingle, a loving community dedicated to making pet adoption seamless. Find your forever friend today!",
  openGraph: {
    title: "Paw Mingle - Pet Adoption Made Easy",
    description:
      "Join Paw Mingle, a loving community dedicated to making pet adoption seamless. Find your forever friend today!",
    url: "https://pawmingle.com",
    type: "website",
    images: [
      {
        url: "https://pawmingle.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paw Mingle - Pet Adoption Made Easy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paw Mingle - Pet Adoption Made Easy",
    description:
      "Join Paw Mingle, a loving community dedicated to making pet adoption seamless. Find your forever friend today!",
    images: ["https://pawmingle.com/twitter-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Navbar>
          <AuthButton />
        </Navbar>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

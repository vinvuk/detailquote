import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DetailQuote - Instant Price Quotes for Auto Detailers",
  description: "Stop guessing what to charge. Create professional, instant quotes for your detailing services in seconds.",
  keywords: ["auto detailing", "car detailing", "price calculator", "quote tool", "detailing business"],
  openGraph: {
    title: "DetailQuote - Instant Price Quotes for Auto Detailers",
    description: "Stop guessing what to charge. Create professional quotes in seconds.",
    type: "website",
  },
};

/**
 * Root layout component for the DetailQuote application.
 * Wraps all pages with consistent fonts and styling.
 * @param children - Child components to render within the layout
 * @returns The root HTML structure with applied fonts
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

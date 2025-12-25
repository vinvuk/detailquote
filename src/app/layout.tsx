import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
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
 * @param children - Child components to render
 * @returns Root HTML structure with custom fonts
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${plusJakarta.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

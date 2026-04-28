import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Streaks — Habit Tracker",
  description: "Track your daily habits and build lasting streaks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="bg-[#0f0e0b] text-[#f0ede4] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

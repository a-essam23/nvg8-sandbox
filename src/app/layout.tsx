import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { aeonik, oldschoolGrotesk } from "@/styles/fonts";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navigate",
  description: "Navigate - Take control of your Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aeonik.className} ${oldschoolGrotesk.variable} antialiased bg-black`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

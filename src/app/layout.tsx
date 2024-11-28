import type { Metadata } from "next";

import Topbar from "@/components/shared/Topbar";

import "../styles/globals.css";
import { bodoni, inter, merriweather, montserrat, playfair } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Mian",
  description: "by Trenphyr Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${bodoni.variable} ${merriweather.variable} ${montserrat.variable} ${playfair.variable} dark`}
      >
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}

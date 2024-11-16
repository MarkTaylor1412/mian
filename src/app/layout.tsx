import type { Metadata } from "next";

import Topbar from "@/components/shared/Topbar";

import "./globals.css";
import { bodoni, inter, merriweather, montserrat, playfair } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Refined",
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
        <body className={`${inter.className} antialiased`}>
          <Topbar />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

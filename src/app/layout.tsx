import type { Metadata } from "next";

import ConditionalNavbar from "@/components/shared/ConditionalNavbar";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";
import { bodoni, inter, merriweather, montserrat, playfair } from "./fonts";

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
        className={`${bodoni.variable} ${merriweather.variable} ${montserrat.variable} ${playfair.variable}`}
      >
        <body className={`${inter.className} antialiased`}>
          <ConditionalNavbar />

          <div className="">{children}</div>

          <div className="fixed bottom-5 right-5 transition-all duration-300 ease-in-out hover:scale-110 hover:transform">
            <ThemeToggle />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

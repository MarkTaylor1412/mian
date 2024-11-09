import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // prefix: "tw-",
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        merriweather: ["var(--font-merriweather)"],
        montserrat: ["var(--font-montserrat)"],
        playfair: ["var(--font-playfair)"],
        bodoni: ["var(--font-bodoni)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "100": "#cfd8e6",
          "200": "#9fb1cc",
          "300": "#6e8bb3",
          "400": "#3e6499",
          "600": "#0b3166",
          "700": "#212A37",
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        black: {
          "100": "#7D8087",
          "200": "#333333",
          "300": "#212121",
          "400": "#171717",
          DEFAULT: "#000000",
        },
        white: {
          "100": "#F1F1F1",
          "200": "#F7F7F7",
          DEFAULT: "#FFFFFF",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      boxShadow: {
        "100": "2px 2px 0px 0px #000000",
        "200": "2px 2px 0px 2px #000000",
        "300": "2px 2px 0px 2px #0e3d80",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

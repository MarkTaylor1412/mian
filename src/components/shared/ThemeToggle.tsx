"use client";

import { useState, useEffect } from "react";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="relative flex w-fit items-center justify-between gap[1] rounded-full bg-muted p-1">
      {/* Indicator */}
      <div
        className={`theme-indicator ${
          theme === "light"
            ? "translate-x-0"
            : theme === "dark"
              ? "translate-x-[64px]"
              : "translate-x-[32px]"
        }`}
      />

      <button
        onClick={() => handleThemeChange("light")}
        className="z-10 flex-1 p-2 text-center"
      >
        <Sun
          size={15}
          className={`${theme === "light" ? "text-primary-foreground" : "text-muted-foreground"}`}
        />
      </button>
      <button
        onClick={() => handleThemeChange("system")}
        className="z-10 flex-1 p-2 text-center"
      >
        <LaptopMinimal
          size={15}
          className={`${theme === "system" ? "text-primary-foreground" : "text-muted-foreground"}`}
        />
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        className="z-10 flex-1 p-2 text-center"
      >
        <Moon
          size={15}
          className={`${theme === "dark" ? "text-primary-foreground" : "text-muted-foreground"}`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;

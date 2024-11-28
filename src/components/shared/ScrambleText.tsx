"use client"

import { ScrambleTextProps } from "@/types";
import React, { useRef } from "react";

// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters = "abcdefghijklmnopqrstuvwxyz";

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  as: Tag = "h1",
  speed = 30,
  increment = 1 / 3,
  className = "",
}) => {
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseOver = () => {
    if (elementRef.current) {
      let iterations = 0;
      const interval = setInterval(() => {
        if (elementRef.current) {
          elementRef.current.innerText = text
            .split("")
            .map((letter, index) => {
              if (index < iterations) {
                return text[index]; // Show actual letter
              }
              return letters[Math.floor(Math.random() * letters.length)]; // Scramble letters
            })
            .join("");
        }

        if (iterations >= text.length) clearInterval(interval);

        iterations += increment; // Adjust speed of progression
      }, speed);
    }
  };

  return (
    <Tag
      ref={elementRef as React.RefObject<any>} // Dynamically assign the ref
      data-value={text}
      onMouseOver={handleMouseOver}
      className={`cursor-pointer ${className}`}
    >
      {text}
    </Tag>
  );
};

export default ScrambleText;

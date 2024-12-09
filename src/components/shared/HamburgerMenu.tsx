"use client";

import { hamburgerMenuLinks } from "@/constants";
import { INavLink } from "@/types";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div
        className="flex cursor-pointer flex-col gap-1 *:h-1 *:origin-left *:rounded-sm *:bg-primary *:duration-500 *:ease-in-out"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={`w-6 ${isOpen ? "w-1 rotate-45" : ""}`} />
        <div className={`w-3 ${isOpen ? "opacity-0" : ""}`} />
        <div className={`w-5 ${isOpen ? "w-6 -rotate-45" : ""}`} />
      </div>

      {isOpen && (
        <div className="semibold-xl glassmorphism absolute left-0 top-24 z-10 flex h-[calc(100vh-96px)] w-full flex-col items-center justify-center gap-8">
          <ul>
            {hamburgerMenuLinks.map((link: INavLink) => {
              return (
                <li key={link.label}>
                  <Link
                    href={link.route}
                    className="flex flex-row items-center gap-2 p-4"
                  >
                    <Image
                      alt={link.label}
                      src={link.imageURL}
                      width={24}
                      height={24}
                      className="image-invert"
                    />

                    <p>{link.label}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;

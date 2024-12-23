"use client";

import { navbarLinks } from "@/constants";
import { INavLink } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="light-sm ml-4 flex flex-col gap-4 rounded-lg bg-card p-4 shadow-md overflow-y-scroll h-[80vh]">
      <ul className="flex flex-col gap-6">
        {navbarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`leftsidebar-link group ${isActive && "bg-primary-500 text-white"}`}
            >
              <Link
                href={link.route}
                className="flex items-center gap-4 p-4"
              >
                <Image
                  alt={link.label}
                  src={link.imageURL}
                  width={20}
                  height={20}
                  className={`image-invert group-hover:opacity-90 ${isActive && "image-invert"}`}
                />
                <div
                  className={`group-hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}
                >
                  {link.label}
                </div>
              </Link>
              <hr className="mt-4 self-center border-b-0 border-accent" />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSideBar;

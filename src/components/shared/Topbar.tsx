import Image from "next/image";
import Link from "next/link";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import { Home } from "lucide-react";
import { bodoni, inter } from "@/app/fonts";
import { navbarLinks } from "@/constants";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Loader from "./Loader";
import { Input } from "../ui/input";

const Topbar = () => {
  return (
    <div className="flex h-24 w-full flex-row items-center justify-between gap-3 bg-secondary px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* LEFT */}
      <div className="flex w-[20%] flex-row items-center justify-center md:hidden lg:block">
        <Link href={"/"}>
          <Image
            alt="Monogram"
            src={"/monogram-logo.svg"}
            width={200}
            height={200}
            priority
          />
        </Link>
      </div>

      {/* CENTER */}
      <div className="hidden w-full items-center justify-between text-sm md:flex">
        <ul className="flex flex-row text-foreground">
          {navbarLinks.map((link) => {
            return (
              <li key={link.label}>
                <Link
                  href={link.route}
                  className="flex flex-row items-center gap-2 p-4"
                >
                  <Image
                    alt={link.label}
                    src={link.imageURL}
                    width={16}
                    height={16}
                  />

                  <p>{link.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center rounded-xl bg-input p-2 xl:flex">
          {/* <Input
            type="search"
            placeholder="ctrl + k to search"
          /> */}
          <input
            type="search"
            placeholder="ctrl + k to search"
            className="bg-transparent outline-none"
          />

          <Image
            alt="Search"
            src={"/search.svg"}
            width={14}
            height={14}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-row items-center justify-end gap-4 xl:gap-8">
        <ClerkLoading>
          <Loader />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="hidden cursor-pointer flex-row items-center gap-3 md:flex">
              <Image
                alt="Followers"
                src={"/followers.svg"}
                width={20}
                height={20}
              />

              <Image
                alt="Chat"
                src={"/chat.svg"}
                width={20}
                height={20}
              />

              <Image
                alt="Notification"
                src={"/notification.svg"}
                width={20}
                height={20}
              />

              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex flex-row items-center gap-2 text-sm">
              <Link href={"/sign-in"}>
                <Image
                  alt="Sign In"
                  src={"/sign-in.svg"}
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <HamburgerMenu />
      </div>
    </div>
  );
};

export default Topbar;

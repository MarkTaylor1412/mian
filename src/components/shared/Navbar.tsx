import { navbarLinks } from "@/constants";
import { INavLink } from "@/types";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import CommandMenu from "./CommandMenu";
import HamburgerMenu from "./HamburgerMenu";
import ScrambleText from "./ScrambleText";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="glassmorphism fixed left-0 top-0 z-20 flex h-24 w-full flex-row items-center justify-between gap-3 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* //# LEFT */}
      <div className="flex w-[20%] flex-row items-center justify-start md:hidden lg:block">
        <Link href={"/"}>
          <ScrambleText
            text="Mian"
            className="extrabold-3xl font-montserrat uppercase -tracking-wide"
          />
        </Link>
      </div>

      {/* //# CENTRE */}
      <div className="hidden w-[80%] flex-row items-center justify-between gap-2 text-sm md:flex">
        <ul className="flex flex-row gap-2">
          {navbarLinks.map((link: INavLink) => {
            return (
              <li key={link.label}>
                <Link
                  href={link.route}
                  className="flex-center group relative flex-row gap-2 px-4 py-2 hover:text-muted-foreground"
                >
                  <Image
                    alt={link.label}
                    src={link.imageURL}
                    width={16}
                    height={16}
                    className="image-invert"
                  />
                  <p>{link.label}</p>
                  <span className="ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center rounded-xl bg-input p-2 xl:flex">
          {/* <Input
            type="search"
            placeholder="Ctrl + K"
            className="bg-transparent"
          /> */}

          <CommandMenu />
        </div>
      </div>

      {/* //# RIGHT */}
      <div className="flex w-[20%] flex-row items-center justify-end gap-4 xl:gap-8">
        <ClerkLoading>
          {/* <Loader /> */}
          <div className="hidden animate-pulse cursor-pointer flex-row items-center gap-3 md:flex">
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="h-5 w-5 rounded-full bg-gray-200" />
            <div className="h-5 w-5 rounded-full bg-gray-200" />

            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className="hidden cursor-pointer flex-row items-center gap-3 md:flex">
              <Image
                alt="Followers"
                src={"/followers.svg"}
                width={20}
                height={20}
                className="image-invert"
              />

              <Image
                alt="Chat"
                src={"/chat.svg"}
                width={20}
                height={20}
                className="image-invert"
              />

              <Image
                alt="Notification"
                src={"/notification.svg"}
                width={20}
                height={20}
                className="image-invert"
              />

              <UserButton />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex-end flex-row gap-2">
              <Link
                href={"/sign-in"}
                className="group relative"
              >
                <Button className="light-sm bg-transparent p-1 text-primary hover:text-muted-foreground">
                  Sign In
                  <span className="ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </Button>
              </Link>

              <Link
                href={"/sign-up"}
                className="group relative"
              >
                <Button className="light-sm bg-transparent p-1 text-primary hover:text-muted-foreground">
                  Sign Up
                </Button>
                <span className="ease-[cubic-bezier(0.25, 0.1, 0.25, 1)] absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <HamburgerMenu />
      </div>
    </div>
  );
};

export default Navbar;

"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();
  const hiddenNavbarRoutes = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/setting  ",
  ];
  const shouldHideNavbar = hiddenNavbarRoutes.includes(pathname);

  if (shouldHideNavbar) return null;

  return (
    <>
      <Navbar />
      <div className="h-16 bg-card" />
    </>
  );
};

export default ConditionalNavbar;

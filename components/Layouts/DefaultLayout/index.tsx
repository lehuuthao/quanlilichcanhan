"use client";
import React, { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const hideHeaderRoutes = ["/login", "/sign-up"];

  const shouldHideHeader =
    hideHeaderRoutes.includes(pathname) || pathname.startsWith("/tags");

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden">
      {!shouldHideHeader && <Header />}
      {children}
      {!hideHeaderRoutes.includes(pathname) && <Footer />}
    </div>
  );
};

export default DefaultLayout;

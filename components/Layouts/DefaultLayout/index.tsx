"use client";
import React, { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const isAuthRoute = ["/login", "/sign-up"].includes(pathname);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden">
      <Header />
      {children}
      {!isAuthRoute && <Footer />}
    </div>
  );
};

export default DefaultLayout;

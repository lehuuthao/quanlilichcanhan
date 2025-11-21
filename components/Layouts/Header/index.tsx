"use client";
import { LogoWithTextImg, TopCloudImg } from "@/assets/Images";
import ImageComp from "@/components/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import HeaderMenu from "./menu";
import { AppContext } from "@/contexts/app.context";
const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [showMenu, setShowMenu] = useState(false);

  const { user, isLoggedIn } = useContext(AppContext);

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-transparent w-full h-[58px] md:h-[74px] px-4 md:px-6 z-[200]">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-2xl md:text-4xl font-black text-rafl_violet-50 hover:text-rafl_violet-100 tracking-tighter"
      >
        {`menu`}
      </button>
      <Link href={"/"}>
        <ImageComp
          src={LogoWithTextImg}
          alt="logo-with-text"
          className="w-[68px] md:w-fit"
        />
      </Link>
      {isHomePage ? (
        <Link
          href={"/login"}
          className="text-2xl md:text-4xl text-rafl_violet-50 hover:text-rafl_violet-100 font-black z-10"
        >
          {`join`}
        </Link>
      ) : isLoggedIn ? (
        <div className="text-2xl md:text-4xl text-rafl_violet-50 hover:text-rafl_violet-100 font-black z-10">
          {user?.fullName || user?.userName}
        </div>
      ) : (
        <div className="mr-[65px]" />
      )}
      <HeaderMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
      {isHomePage && (
        <ImageComp
          src={TopCloudImg}
          alt="top-cloud"
          className="hidden lg:flex absolute top-0 right-4 xxl:right-[82px]"
        />
      )}
    </div>
  );
};

export default Header;

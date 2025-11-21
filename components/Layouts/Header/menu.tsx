"use client";

import ImageComp from "@/components/Image";
import {
  CRDinoLg,
  CRRightTreeSm,
  CRStoneSm,
  LogoWithTextImg,
} from "@/assets/Images";
import { cn } from "@/utils/styles";
import { useEffect, useRef } from "react";

const HeaderMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed md:absolute top-0 left-0 right-0 bottom-0 flex bg-rafl_purple-950 flex-col z-50 h-screen md:h-[770px]",
        isOpen ? "flex slide-down" : "hidden slide-up"
      )}
    >
      <div className="flex items-center justify-between w-full px-4 md:px-6 py-4">
        <div />
        <ImageComp
          src={LogoWithTextImg}
          alt="logo-with-text"
          className="w-[68px] md:w-fit ml-[82px] md:ml-[122px]"
        />

        <button
          onClick={onClose}
          className="text-2xl md:text-4xl text-rafl_violet-50 hover:text-rafl_violet-100 font-black z-10"
        >
          {`close`}
        </button>
      </div>
      <div className="flex flex-col items-center md:items-start h-full justify-between p-6 md:p-10 py-8 bg-rafl_purple-950 relative">
        <div className="flex flex-col leading-[56px] text-[56px] md:leading-[100px] md:text-[100px] xl:leading-[120px] xl:text-[124px]">
          <p className="text-center md:text-left font-black text-rafl_violet-50 tracking-[-3px]">
            about
          </p>
          <p className="text-center md:text-left font-black text-rafl_violet-50 tracking-[-3px]">
            live game
          </p>
          <p className="text-center md:text-left font-black text-rafl_violet-50 tracking-[-3px]">
            subscription
          </p>
        </div>
        <div className="flex items-end h-full w-full relative">
          <ImageComp
            src={CRDinoLg}
            alt="KingCRLg"
            className="absolute w-[300px] lg:w-[400px] xl:w-[476px] bottom-[55%] right-[-10%] sm:right-[30%] lg:right-0 md:bottom-[60%] lg:bottom-[80%] xl:bottom-[120%] translate-y-1/2"
          />
          <ImageComp
            src={CRRightTreeSm}
            alt="CRLeftTreeSm"
            className="absolute bottom-[15%] md:right-[60%] max-w-[150px] md:max-w-[200px] lg:max-w-full lg:right-[30%] md:bottom-0 lg:bottom-[-50px]"
          />
          <ImageComp
            src={CRStoneSm}
            alt="CRLeftTreeLg"
            className="absolute max-w-[30px] bottom-[30%] md:max-w-fit md:bottom-16 right-[-10px] md:right-[30%] lg:right-20"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center flex-wrap w-full gap-x-6 md:gap-x-8 gap-y-4">
          <p className="text-2xl md:text-[28px] xl:text-[36px] leading-6 font-black text-violet-50 tracking-tight">
            privacy policy
          </p>
          <p className="text-2xl md:text-[28px] xl:text-[36px] leading-6 font-black text-violet-50 tracking-tight">
            terms of use
          </p>
          <p className="text-2xl md:text-[28px] xl:text-[36px] leading-6 font-black text-violet-50 tracking-tight">
            careers
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;

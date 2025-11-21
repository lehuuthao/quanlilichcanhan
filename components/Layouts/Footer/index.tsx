"use client";
import DiscordIcon from "@/assets/Icons/DiscordIcon";
import InstagramIcon from "@/assets/Icons/InstagramIcon";
import TelegramIcon from "@/assets/Icons/TelegramIcon";
import TikTokIcon from "@/assets/Icons/TikTokIcon";
import XIcon from "@/assets/Icons/XIcon";
import { KingFooter } from "@/assets/Images";
import ImageComp from "@/components/Image";
import { cn } from "@/utils/styles";
import { ReactNode } from "react";

const SocialIcon = ({
  icon,
  className,
}: {
  icon: ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "relative flex items-center justify-center h-fit rounded-2xl bg-rafl_purple-500 size-16 min-w-16 lg:size-[84px] lg:min-w-[84px]",
      className
    )}
  >
    {icon}
  </div>
);

const Footer = () => {
  return (
    <div className="flex flex-col items-center px-6 pt-8 lg:pt-[74px] bg-rafl_purple-950 overflow-hidden">
      <div className="flex flex-col md:flex-row-reverse w-full gap-y-[42px] max-w-[1040px]">
        <div className="flex flex-col gap-y-8 md:flex-1 md:w-full md:items-end">
          <p className="text-[64px] leading-[50px] font-black text-rafl_violet-50 tracking-[-3px]">
            follow us
          </p>
          <div className="flex items-center w-full md:justify-end flex-wrap gap-2">
            <SocialIcon
              icon={<TelegramIcon />}
              className="rotate-[2deg]
        "
            />
            <SocialIcon icon={<DiscordIcon />} className="rotate-[-2deg]" />
            <SocialIcon
              icon={<XIcon />}
              className="rotate-[2deg]
        "
            />
            <SocialIcon
              icon={<TikTokIcon />}
              className="rotate-[-2deg]
        "
            />
            <SocialIcon
              icon={<InstagramIcon />}
              className="rotate-[-2deg]
        "
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[96px] font-black text-rafl_violet-50 tracking-[-3px] leading-[90px] md:max-w-[337px]">
            rafl about pool
          </p>
        </div>
      </div>
      <div className="flex items-center flex-wrap w-full gap-x-8 gap-y-4 mt-16 lg:mt-[130px] max-w-[1040px]">
        <p className="text-2xl leading-6 font-black text-violet-50 tracking-tight">
          privacy policy
        </p>
        <p className="text-2xl leading-6 font-black text-violet-50 tracking-tight">
          terms of use
        </p>
        <p className="text-2xl leading-6 font-black text-violet-50 tracking-tight">
          careers
        </p>
      </div>
      <div className="flex items-center w-full max-w-[1040px] relative pb-9 lg:pb-[74px]">
        <p className="text-lg leading-6 text-rafl_purple-400 font-black md:text-2xl md:leading-7 mt-6">
          Copyright {new Date().getFullYear()} - All Rights Reserved
        </p>
        <ImageComp
          loading="lazy"
          src={KingFooter}
          alt="img"
          className="absolute bottom-0 w-[300px] lg:w-[400px] xxl:w-[440px] right-0 xxl:-right-40 hidden md:flex object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;

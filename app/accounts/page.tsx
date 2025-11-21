"use client";
import { cn } from "@/utils/styles";
import { ReactNode, useContext } from "react";
import { DailySm, DailyLg, MonthlySm, MonthlyLg } from "@/assets/Images";
import ImageComp from "@/components/Image";
import { AppContext } from "@/contexts/app.context";

const Title = ({ title }: { title: ReactNode }) => (
  <div
    className={cn(
      "flex items-center justify-center flex-1 w-full max-w-[500px] min-h-[82px] lg:min-h-[103px] rounded-3xl bg-rafl_purple-500 text-4xl lg:text-[44px] font-black text-violet-50 tracking-[-1px]"
    )}
  >
    {title}
  </div>
);
const Account = () => {
  const { user } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center pt-[70px] md:pt-[120px] pb-[64px] sm:pb-[120px] bg-rafl_violet-950 overflow-hidden">
      <div className="flex flex-col items-center w-full gap-y-8 md:gap-y-16 max-w-[1040px]">
        <div className="flex items-center justify-center w-full max-w-[664px] px-4 lg:px-0">
          <h1 className="text-center text-[64px] leading-[66px] md:leading-[80px] md:text-[75px] lg:text-[96px] lg:leading-[90px] font-black text-rafl_violet-50 tracking-[-3px]">
            welcome back, {user?.fullName || user?.userName}
          </h1>
        </div>
        <div className="flex flex-col gap-y-4 w-full items-center px-6">
          <div className="flex flex-col items-center md:flex-row justify-center flex-nowrap w-full gap-4">
            <Title title="subscription" />
            <Title title="personal" />
            <Title title="settings" />
          </div>
          <ImageComp
            loading="lazy"
            src={DailyLg}
            alt="DailyLgImg"
            className="hidden md:flex w-full"
          />
          <ImageComp
            loading="lazy"
            src={MonthlyLg}
            alt="MontlyLgImg"
            className="hidden md:flex w-full"
          />
          <ImageComp
            loading="lazy"
            src={DailySm}
            alt="MontlyLgImg"
            className="flex md:hidden w-full max-w-[500px]"
          />
          <ImageComp
            loading="lazy"
            src={MonthlySm}
            alt="MontlyLgImg"
            className="flex md:hidden w-full max-w-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Account;

import dynamic from "next/dynamic";

const JoinTheRafl = dynamic(() => import("@/features/home/join-the-rafl"));
const WhatIsRafl = dynamic(() => import("@/features/home/what-is-rafl"));
const CurrentJackpot = dynamic(() => import("@/features/home/current-jackpot"));

export default function Home() {
  return (
    <>
      <JoinTheRafl />
      <WhatIsRafl />
      <CurrentJackpot />
    </>
  );
}

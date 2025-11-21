import {
  CRDinoLg,
  CRDinoSm,
  CRLeftTreeLg,
  CRLeftTreeSm,
  CRRightTreeSm,
  CRStoneLg,
  CRStoneSm,
  JackpotLg,
  JackpotSm,
  KingCRLg,
  KingWIRSmImg,
} from "@/assets/Images";
import ImageComp from "@/components/Image";
import Link from "next/link";

const CurrentJackpot = () => {
  return (
    <div className="flex flex-col w-full h-fit bg-rafl_violet-950 pt-4 md:pt-8 pb-16 lg:pb-[100px]">
      <div className="flex justify-center w-full">
        <h1 className="text-[80px] xs:text-[96px] leading-[90px] md:text-[110px] lg:!text-[144px] lg:leading-[130px] font-black text-rafl_violet-50 text-center tracking-[-3px] px-6 xl:px-0 max-w-[1040px]">
          current jackpot pool $100k
        </h1>
      </div>
      <div className="flex items-center justify-center w-full relative md:-mt-16 lg:-mt-24">
        <div className="relative">
          <ImageComp
            src={KingWIRSmImg}
            alt="KingWIRSmImg"
            className="flex md:hidden"
          />
          <ImageComp
            src={KingCRLg}
            alt="KingCRLg"
            className="hidden md:flex w-[300px] md:w-[400px] lg:size-fit"
          />
        </div>
        <ImageComp
          src={CRLeftTreeSm}
          alt="CRLeftTreeSm"
          className="absolute top-[45%] left-0 flex md:hidden"
        />
        <ImageComp
          src={CRLeftTreeLg}
          alt="CRLeftTreeLg"
          className="absolute top-[45%] left-[100px] lg:left-[120px] xl:left-[200px] xxl:left-[250px] hidden md:flex w-[150px] lg:w-[170px] xxl:w-fit"
        />
        <ImageComp
          src={CRStoneLg}
          alt="CRStoneLg"
          className="absolute top-[68%] left-0 sm:left-20 lg:left-[100px] w-[43px] md:w-fit"
        />
        <ImageComp
          src={CRStoneSm}
          alt="CRStoneSm"
          className="absolute top-[80%] left-[200px] lg:left-[250px] xxl:left-[450px] hidden md:flex"
        />
        <ImageComp
          src={CRRightTreeSm}
          alt="CRDinoSm"
          className="absolute top-[70%] w-[150px] lg:w-[180px] xl:w-fit right-20 lg:right-[160px] xxl:right-[290px] hidden md:flex"
        />
        <ImageComp
          src={CRDinoSm}
          alt="CRDinoSm"
          className="absolute -top-4 right-0 flex md:hidden"
        />
        <ImageComp
          src={CRDinoLg}
          alt="CRDinoLg"
          className="absolute top-16 right-10 hidden md:flex w-[200px] lg:top-4 lg:w-[300px] xxl:w-fit xxl:-top-4"
        />
        <ImageComp
          src={CRStoneSm}
          alt="CRStoneSm"
          className="absolute top-[50%] lg:top-[55%] right-20 hidden md:flex w-7"
        />
      </div>
      <div className="flex flex-col items-center w-full gap-y-6 px-6">
        <ImageComp src={JackpotSm} alt="JackpotSm" className="flex md:hidden" />
        <ImageComp src={JackpotLg} alt="JackpotLg" className="hidden md:flex" />
        <p className="text-xl leading-6 md:text-2xl md:leading-7 text-rafl_violet-50 font-bold text-center max-w-[520px]">
          A vibrant and imaginative realm filled with diverse landscapes,
          cultures, and adventures waiting to be explored.
        </p>
        <Link
          href={"/login"}
          className="flex items-center justify-center w-[144px] h-[60px] rounded-2xl bg-rafl_violet-400 text-2xl font-black text-rafl_purple-950"
        >
          join rafl
        </Link>
      </div>
    </div>
  );
};

export default CurrentJackpot;

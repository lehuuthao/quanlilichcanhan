import ImageComp from "@/components/Image";
import {
  AnimalImg,
  KingSmImg,
  KingTopImg,
  LeftBottomTree,
  LeftBottomTree2,
  LeftCloudImg,
  LeftCloudImg2,
  LeftCloudSmImg,
  LeftCloudSmImg2,
  LeftTree,
  LeftTree2,
  RightBottomTree,
  RightBottomTree2,
  RightCloudSmImg,
  RightTree,
  RightTree2,
} from "@/assets/Images";
import Link from "next/link";

const JoinTheRafl = () => {
  return (
    <div className="size-full text bg-home-gradient pt-[58px] md:pt-[74px] h-[800px] xs:h-[700px] md:!h-[880px] relative">
      <ImageComp
        loading="lazy"
        src={LeftCloudImg}
        alt="LeftCloudImg"
        className="hidden md:flex absolute left-[-50%] md:left-0 top-[100px]"
      />
      <ImageComp
        loading="lazy"
        src={LeftCloudSmImg}
        alt="LeftCloudSmImg"
        className="flex md:hidden absolute left-0 top-[77px]"
      />
      <ImageComp
        loading="lazy"
        src={RightCloudSmImg}
        alt="RightCloudSmImg"
        className="flex md:hidden absolute right-0 top-[109px]"
      />
      <div className="moon_img" />
      <ImageComp
        loading="lazy"
        src={LeftTree}
        alt="img"
        className="absolute z-30 max-w-[150px] md:max-w-full -left-6 bottom-0 flex"
      />
      <ImageComp
        loading="lazy"
        src={LeftTree2}
        alt="img"
        className="absolute z-0 max-w-[100px] md:max-w-full -left-6 bottom-0 flex"
      />
      <ImageComp
        loading="lazy"
        src={LeftCloudSmImg2}
        alt="img"
        className="flex md:hidden absolute left-0 top-[300px]"
      />
      <ImageComp
        loading="lazy"
        src={LeftCloudImg2}
        alt="img"
        className="hidden md:flex absolute left-0 top-[350px]"
      />
      <ImageComp
        loading="lazy"
        src={LeftBottomTree}
        alt="img"
        className="absolute z-10  bottom-0 max-w-full -left-6 hidden md:flex"
      />
      <ImageComp
        loading="lazy"
        src={LeftBottomTree2}
        alt="img"
        className="absolute z-0 bottom-0 max-w-full left-1 hidden md:flex"
      />
      <ImageComp
        loading="lazy"
        src={RightTree}
        alt="img"
        className="absolute z-10 max-w-[150px] md:max-w-full bottom-0 right-0 flex"
      />
      <ImageComp
        loading="lazy"
        src={RightTree2}
        alt="img"
        className="absolute z-0 max-w-[150px] md:max-w-full bottom-0 right-0 flex"
      />
      <ImageComp
        loading="lazy"
        src={RightBottomTree}
        alt="img"
        className="absolute z-20 bottom-0 max-w-full right-0 hidden md:flex"
      />
      <ImageComp
        loading="lazy"
        src={RightBottomTree2}
        alt="img"
        className="absolute z-30  bottom-0 max-w-full right-20  hidden md:flex"
      />
      <ImageComp
        loading="lazy"
        src={KingTopImg}
        alt="img"
        className="absolute z-[111] max-w-full bottom-0 left-1/2 -translate-x-1/2 hidden md:flex"
      />
      <ImageComp
        loading="lazy"
        src={KingSmImg}
        alt="img"
        className="absolute z-[111] max-w-full bottom-0 left-1/2 -translate-x-1/2 flex md:hidden"
      />
      <ImageComp
        loading="lazy"
        src={AnimalImg}
        alt="img"
        className="absolute z-[110] max-w-[600px] md:max-w-full  bottom-0 left-1/2 -translate-x-1/2"
      />
      <div className="flex flex-col items-center z-[120] relative pt-4 md:pt-10 px-4 gap-y-6 md:gap-y-9">
        <div className="flex items-center justify-center font-black text-[104px] lg:text-[130px] xl:text-[144px] text-rafl_violet-50 flex-wrap text-center px-3 w-full max-w-full md:max-w-[1030px] relative z-10">
          <p className="inline leading-[100px] xl:leading-[150px] tracking-[-3px]">
            join the rafl
          </p>
        </div>
        <div className="text-xl leading-6 md:text-2xl md:leading-7 flex items-center justify-center max-w-[300px] md:max-w-[520px] px-5 flex-wrap relative z-10 xl:-mt-4">
          <p className="text-rafl_violet-50 font-bold text-center">
            A vibrant and imaginative realm filled with diverse landscapes,
            cultures, and adventures waiting to be explored.
          </p>
        </div>
        <Link
          href={"/login"}
          className="flex items-center justify-center text-2xl leading-6 bg-rafl_violet-50 text-rafl_violet-950 w-36 h-[60px] rounded-2xl font-bold hover:cursor-pointer hover:opacity-90 xl:-mt-2 relative z-[120]"
        >
          join rafl
        </Link>
      </div>
    </div>
  );
};

export default JoinTheRafl;

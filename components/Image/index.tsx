"use client";
import { cn } from "@/utils/styles";
import Image, { ImageProps } from "next/image";

const ImageComp = ({ src, alt, className, ...props }: ImageProps) => {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={0}
      height={0}
      className={cn("w-fit h-auto object-cover", className)}
    />
  );
};

export default ImageComp;

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";


interface FigureProps {
  children?: ReactNode;
  desc: string;
  lightUrl?: string;
  darkUrl?: string;

}

export function FigureMdx({
  children,
  lightUrl,
  darkUrl,
  desc,
  ...props

}: FigureProps) {

  const lightImgSrc = `/learn/light/${lightUrl}.png`;
  const darkImgSrc = `/learn/dark/${lightUrl}.png`;
  return (
    <>
      <figure className={cn("my-5 items-start w-full dark:max-w-none")} {...props}>
        <Image className={cn(" w-full h-auto block rounded-md border border-zinc-200 bg-gray-100 dark:hidden")} src={lightImgSrc} alt={desc} width={1400} height={800} />
        <Image className={cn("w-full h-auto hidden rounded-md border dark:border-zinc-700 dark:bg-gray-900 dark:block")} src={darkImgSrc} alt={desc} width={1400} height={800} />
      </figure>
      <p className={cn(" text-center -mt-4 normal-case italic text-sm caption-bottom")}>{desc}</p>
    </>

  )
}
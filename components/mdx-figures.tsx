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

  return (
    <>
      <figure className={cn("my-5 items-start rounded-md border w-full dark:max-w-none border-slate-300 dark:border-slate-700")} {...props}>
      <Image className={cn(" w-full block dark:hidden")} src={"/" + lightUrl} alt={desc} width={200} height={100} />
      <Image className={cn("w-full hidden dark:block")} src={"/" + darkUrl} alt={desc} width={200} height={100} />

    </figure>
      <p className={cn(" text-center -mt-4 capitalize italic text-sm caption-bottom")}>{desc}</p>
    </>

  )
}
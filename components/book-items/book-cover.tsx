import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";
import { Card } from "../ui/card";
import { siteConfig } from "@/config/site";
import Link from "next/link";


interface BCoverProps {
  children?: ReactNode;
  // bColor?: "white" | "red" | "blue" | "sky" | "black" | "green";
  bColor?: string;
  desc?: string;
  slug: string;
  bName?: string;

}

export function BookCover({
  children,
  slug,
  bName,
  bColor: colorName,
  desc,
  ...props

}: BCoverProps) {


  return (
    <Link href={"/" + slug} className={cn(" relative w-min max-w-[200px] max-h-[350px] h-auto ")}>
      <div className={cn("w-[150px] h-[220px] flex flex-col items-center justify-between rounded shadow-2xl bg-gradient-to-b from-rose-500 to-rose-700 text-white", {
        "from-white to-zinc-200 text-black": colorName === "white",
        "from-red-500 to-red-700 ": colorName === "red",
        " from-blue-500 to-blue-700 ": colorName === "blue",
        " from-sky-500 to-sky-700 ": colorName === "sky",
        " from-zinc-900 to-zinc-950 ": colorName === "black",
        " from-green-500 to-green-700 ": colorName === "green",
        " from-orange-500 to-orange-700 ": colorName === "orange",
        " from-rose-500 to-rose-700 ": colorName === "rose",

      })}>
        <div className={cn("absolute w-[150px] h-[220px] rounded bg-red-20 shadow-inner overflow-hidden ")}>
          <img className={cn("h-full w-full")} src="/forgud_cov.png" alt="" />

        </div>
        <p className={cn(" ml-3 mr-2 text-base mt-6 text-center text-balance font-semibold")}>{bName}</p>
        <p className={cn(" ml-3 mr-2 text-sm mb-4 text-center text-muted text-balance font-semibold",{
          "text-muted-foreground": colorName === "white"
        }
        )}>{siteConfig.title}</p>

        {/* <Image className={cn(" h-auto block rounded-md border border-zinc-200 bg-gray-100 dark:hidden")} src="/" alt="" width={50} height={60} /> */}
      </div>
      <p className={cn("w-full text-base mt-3 break-words text-center line-clamp-2 font-semibold")}>{bName}</p>
    </Link>)
}
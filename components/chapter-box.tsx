import { cn } from "@/lib/utils";
import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { Info, Sparkles } from "lucide-react";

interface ChapterProps {
  slug: string;
  chapterNum: number;
  currentNum?: boolean;
  chapterName?: string;


}
export default function ChapterBox({ slug, currentNum, chapterName, chapterNum }: ChapterProps) {

  return (<Link className={cn(" p-2 gap-3 grid-rows-2 w-full group flex items-center rounded-md hover:bg-slate-200")} href={"/" + slug}>

    <div className={cn(` w-8 h-8 p-2 rounded-full flex flex-shrink-0 items-center font-semibold justify-center ${currentNum ? "text-white bg-blue-600" : "bg-blue-200 text-blue-500 group-hover:bg-gray-300 group-hover:text-gray-500"}`)}>{chapterNum >= 1 ? chapterNum : chapterNum === 0 ? <Info /> : <Sparkles />}</div>
    <div className={cn("flex flex-col")}>
      {chapterNum >= 1 ? <> <p className={cn(" text-sm text-muted-foreground")}>Chapter {chapterNum}</p>
        <p className={cn("text-sm text-wrap")}>{chapterName}</p>
      </>
        : <p className={cn("text-sm text-wrap")}>{chapterName}</p>

      }
    </div>

  </Link>)
}
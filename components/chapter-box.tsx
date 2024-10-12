import { cn } from "@/lib/utils";
import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { Info, Sparkles } from "lucide-react";

interface ChapterProps {
  slug: string;
  chapterNum: number;
  currentNum?: boolean;
  chapterName?: string;
  isMod?: boolean;
  isNew?: boolean;
  isBNew?: boolean;

}
export default function ChapterBox({ slug, currentNum, chapterName, chapterNum, isMod, isNew, isBNew }: ChapterProps) {

  return (<Link className={cn(" p-2 gap-3 grid-rows-2 w-full group flex items-center rounded-md hover:bg-slate-400/15")} href={"/" + slug}>

    <div className={cn(` w-8 h-8 p-2 rounded-full flex flex-shrink-0 items-center font-semibold justify-center ${currentNum ? "text-white bg-blue-600" : "bg-blue-200 text-blue-500 group-hover:bg-gray-300 group-hover:text-gray-500"}`)}>{chapterNum >= 1 ? chapterNum : chapterNum === 0 ? <Info /> : <Sparkles />}</div>
    <div className={cn("flex flex-col w-full")}>
      {chapterNum >= 1 ? <> <div className={cn("flex w-full items-center justify-between")}><p className={cn(" text-sm text-muted-foreground")}>Chapter {chapterNum}</p>
        {(isNew || isMod) && <div className={cn("text-end")}>
          <span className={cn(`${isNew ? "bg-blue-500" : isMod ? "bg-green-500" : null} px-2 py-0.5 text-xs text-muted font-normal rounded-2xl`)}>{isNew ? "NEW" : isMod ? "MOD" : null}</span>
        </div>}</div>

        <p className={cn("text-sm text-wrap")}>{chapterName}</p>
      </>
        : <><div className={cn("flex w-full items-center justify-between")}> <p className={cn("text-sm text-wrap")}>{chapterName}</p>
          {<div className={cn("text-end")}>
            <span className={cn(`${isBNew ? "bg-red-500" : isNew? "bg-blue-500": isMod ? "bg-green-500" : null} px-2 py-0.5 text-xs text-muted font-normal rounded-2xl`)}>{(isNew || isBNew) ? "NEW" : isMod ? "MOD" : null}</span>
          </div>}
        </div>
        </>

      }
    </div>

  </Link>)
}
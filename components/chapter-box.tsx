import { cn } from "@/lib/utils";
import Link from "next/link";
import { CircleCheckBig, Info, LibraryBig } from "lucide-react";

interface ChapterProps {
  slug: string;
  chapterNum: number;
  currentNum?: boolean;
  chapterName?: string;
  isMod?: boolean;
  isNew?: boolean;
  isCompleted?: boolean;

}

export default function ChapterBox({ slug, currentNum, chapterName, chapterNum, isMod, isNew, isCompleted }: ChapterProps) {
  return ((slug != null && chapterNum !=0 )&& <Link className={` p-2 gap-3 grid-rows-2 w-full group items-center rounded-md hover:bg-slate-400/15 flex`} href={"/" + slug}>

    <div className={` w-8 h-8 p-2 rounded-full flex flex-shrink-0 items-center font-semibold justify-center ${currentNum ? "text-white bg-blue-600" : "bg-blue-200 text-blue-500 group-hover:bg-gray-300 group-hover:text-gray-500"}`}>{isCompleted ? <CircleCheckBig /> : chapterNum}</div>
    <div className={"flex flex-col w-full"}>
      <div className={"flex w-full items-center justify-between"}><p className={cn(" text-[13px] text-muted-foreground")}>Chapter {chapterNum}</p>
        {(isNew || isMod) && <div className={"text-end"}>
          <span className={`${isNew ? "bg-blue-500" : isMod ? "bg-green-500" : null} px-2 py-0.5 text-xs text-muted font-normal rounded-2xl group-hover:bg-gray-400`}>{isNew ? "NEW" : isMod ? "MOD" : null}</span>
        </div>}</div>
      <p className={cn("text-sm text-wrap")}>{chapterName}</p>
    </div>
  </Link>
  )
}



interface ChapterIntroProps {
  slug: string;
  currentNum?: boolean;
  isMod?: boolean;
  isBNew?: boolean;
  isNext?: boolean;
}
export function ChapterIntroBox({ slug, isMod, isBNew, currentNum, isNext }: ChapterIntroProps) {
  return (
    <Link className=" p-2 gap-3 grid-rows-2 w-full group items-center rounded-md hover:bg-slate-400/15 flex" href={"/" + slug}>

      <div className={` w-8 h-8 p-2 rounded-full flex flex-shrink-0 items-center font-semibold justify-center ${currentNum ? "text-white bg-blue-600" : "bg-blue-200 text-blue-500 group-hover:bg-gray-300 group-hover:text-gray-500"}`}>{isNext ? <LibraryBig /> : <Info />}</div>
      <div className="flex flex-col w-full">

        <div className="flex w-full items-center justify-between"> <p className="text-sm text-wrap">{isNext ? "Choose Next Book" : "Introduction"}</p>
          {(isBNew || isMod) && <div className="text-end">
            <span className={`${isBNew ? "bg-red-500" : isMod ? "bg-green-500" : null} px-2 py-0.5 text-xs text-muted font-normal rounded-2xl group-hover:bg-gray-400`}>{isBNew ? "NEW" : "MOD"}</span>
          </div>}
        </div>



      </div>

    </Link>)
}
'use client'
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChapterList } from "./chapter-list";
import { useEffect, useState } from "react";
import { chapters } from "@/.velite";
import { List } from "lucide-react";



interface ChapterPageProps {
  chapNum: number
  chapTitle: string
  slug: string;
}


export function ChapterHeader({ chapNum, chapTitle, slug }: ChapterPageProps) {

  // for using as shadow after chapter header go to the top
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 58);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)

  })

  return (<>
    <aside className={cn(`z-10 px-3 sm:py-3 flex flex-row max-w-[1072px] h-auto min-h-14 items-center rounded-full bg-slate-300/15  ${isSticky ? "border lg:w-full left-4 right-4 lg:left-1/2 lg:right-[unset] lg:-translate-x-1/2 border-zinc-400/25 top-4 backdrop-blur-xl shadow-sm fixed" : ""}`)}>
      <ChapterList slug={slug} isSticky={isSticky} />

      <div aria-hidden="true" className={cn(" w-[1px] h-9 ml-2.5 mr-3 bg-gray-400 hidden sm:block")} />
      <div className={cn(" w-9 h-11  dark:bg-gray-500 bg-gray-400 rounded-sm hidden sm:block")} >
      </div>

      <div className={cn(" flex flex-col ml-3")}>
        {chapNum >= 1 ? <><h3 className={cn("text-sd font-semibold")}>Chapter {chapNum}</h3>
          <p className={cn("text-sm font-medium text-muted-foreground")}>{chapTitle}</p>
        </> :
          <p className={cn("text-sm font-medium text-muted-foreground")}>{chapTitle}</p>
        }
      </div>

    </aside>

  </>
  )
}
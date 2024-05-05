'use client'
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChapterList } from "./chapter-view";
import { useEffect, useState } from "react";
import { chapters } from "@/.velite";
import { List } from "lucide-react";



interface ChapterPageProps {
  chapNum: number
  chapTitle: string
}


export function ChapterHeader({ chapNum, chapTitle }: ChapterPageProps) {

  // for using as shadow after chapter header go to the top
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 80);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)

  })

  return (<>
    <aside className={cn(`z-20  px-3 sm:py-3 lg:-mx-10 flex flex-row max-w-[1072px] h-auto min-h-14 items-center rounded-full bg-zinc-200/45 dark:bg-zinc-600/45 ${isSticky ? "border border-zinc-400/25 top-4 backdrop-blur-lg shadow-2xl sticky" : ""}`)}>
      {/* <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" className="w-10 rounded-full px-0 bg-transparent hover:bg-gray-400/15 bg-opacity-20">
        <List className="h-5 w-5" />
        <span className="sr-only">Toggle Theme</span>
      </Button> */}
      <ChapterList   />

      <div aria-hidden="true" className={cn(" w-[1px] h-9 ml-2.5 mr-3 bg-gray-400 hidden sm:block")} />
      <div className={cn(" w-9 h-11  dark:bg-gray-500 bg-gray-400 rounded-sm hidden sm:block")} >
      </div>

      <div className={cn(" flex flex-col ml-3")}>
        <h3 className={cn("text-sd font-semibold")}>Chapter {chapNum}</h3>
        <p className={cn("text-sm font-medium text-muted-foreground")}>{chapTitle}</p>
      </div>
      
    </aside>
    {/* {isOpen ? (
      <div className={cn(`w-80 h-80 mt-4 fixed bg-black ${isSticky ? "border border-zinc-400/25 top-4 backdrop-blur-lg shadow-2xl fixed" : ""} `)}>Hello g i am here!</div>
    ) : null} */}
  </>
  )
}
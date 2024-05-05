'use client'

import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { List } from "lucide-react";
import { cn, sortByChapters } from "@/lib/utils";
import { chapters } from "@/.velite";
import ChapterBox from "./chapter-box";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTrigger } from "@radix-ui/react-dialog";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { slug } from "github-slugger";

interface ChapPageProps {
  params: {
  slug: string;
  }
}


export function ChapterList() {
  const [open, setOpen] = useState(true);
  const latestChapter = sortByChapters(chapters.filter((chapter) => chapter.published)).slice(0, 5);

  return (<>
    <NavigationMenu >
      <NavigationMenuList className="center flex list-none rounded-[6px]  p-1 ">

        <NavigationMenuItem>
          <NavigationMenuTrigger className="">

            <Button onClick={()=>setOpen(!open)} variant="ghost" className="w-10 rounded-full px-0 bg-transparent hover:bg-gray-400/15 bg-opacity-20">
              <List className="h-5 w-5" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="absolute h-[auto] w-[544px] mt-8 rounded-lg p-3 -ml-2 left-0 border hidden sm:block bg-white dark:bg-zinc-900 border-zinc-400/45   ">

            <div className={cn(" flex flex-row row-span-2 w-full h-auto  ")}>
              <ul className="flex flex-col">

                {latestChapter.map((chapter) => <li key={chapter.slug} className="first:border-border">
                  <ChapterBox
                  
                    slug={chapter.slug}
                    chapterName={chapter.chapTitle}
                    chapterNum={chapter.chapNum}
                    currentNum={slug(chapter.slug) === chapter.slug}
                  />
                </li>)}
              </ul>
              <ul className="flex flex-col">

                {latestChapter.map(chapter => <li key={chapter.slug} className="first:border-border">
                  <ChapterBox
                    slug={chapter.slug}
                    chapterName={chapter.chapTitle}
                    chapterNum={chapter.chapNum}
                  />
                </li>)}
              </ul>
            </div>

          </NavigationMenuContent>
        
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    {/* <Sheet open={open} onOpenChange={setOpen}> */}
      {/* <SheetTrigger asChild>
        <Button variant="ghost" className="w-10 rounded-full px-0 bg-transparent hover:bg-gray-400/15 bg-opacity-20">
          <List className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger> */}

      {/* <SheetContent side="bottom" className={cn("-px-4 rounded-t-lg md:hidden overflow-y-scroll h-3/4")}>
        <SheetClose className={cn("hidden")} />
        <div className={cn("")}>
          <ul className="flex flex-col">
            {latestChapter.map(chapter => <li key={chapter.slug} className="first:border-border">
              <ChapterBox
                slug={chapter.slug}
                chapterName={chapter.chapTitle}
                chapterNum={chapter.chapNum}
              />
            </li>)}
          </ul>

        </div>
      </SheetContent> */}
      {/* 
      <DialogContent className={cn("-px-4 rounded-t-lg top-4 hidden md:block overflow-y-scroll h-3/4 fixed")}>
       <DialogClose className={cn("hidden")}/>
       <DialogOverlay/>
        <div className={cn("")}>
          <ul className="flex flex-col">
            {latestChapter.map(chapter => <li key={chapter.slug} className="first:border-border">
              <ChapterBox
                slug={chapter.slug}
                chapterName={chapter.chapTitle}
                chapterNum={chapter.chapNum}
              />
            </li>)}
          </ul>
             
        </div>
      </DialogContent> */}

    {/* </Sheet> */}
  </>
  )
}



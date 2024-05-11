'use client'

import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { List } from "lucide-react";
import { cn, sortByChapters } from "@/lib/utils";
import { chapters } from "@/.velite";
import ChapterBox from "./chapter-box";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";

interface ChapPageProps {
  slug: string;
  isSticky: boolean;
}


export function ChapterList({ slug, isSticky }: ChapPageProps) {
  const [open, setOpen] = useState(false);
  const latestChapter = sortByChapters(chapters.filter((chapter) => chapter.published)).slice(0, 5);

  return (<>
    <NavigationMenu className="hidden md:block" >
      <NavigationMenuList className="center flex list-none rounded-[6px]  p-1 ">

        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>

            <Button variant="ghost" className="w-10 rounded-full px-0 bg-transparent hover:bg-gray-400/15 bg-opacity-20">
              <List className="h-5 w-5" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent className={`absolute h-[auto] w-[544px] mt-8 rounded-lg p-3 -ml-2 left-0 border  ${isSticky? "backdrop-blur-lg supports-[backdrop-filter]:bg-background/95" :""}  items-center backdrop-blur-2xl  border-zinc-400/45 shadow-lg `}>

            <div className={cn(" flex flex-row row-span-2 w-full h-auto")}>
              <ul className="flex flex-col">

                {latestChapter.map((chapter) => <li key={chapter.slug} className="first:border-border">
                  <ChapterBox

                    slug={chapter.slug}
                    chapterName={chapter.chapTitle}
                    chapterNum={chapter.chapNum}
                    currentNum={(slug) === chapter.slug}
                  />
                </li>)}
              </ul>
              <ul className="flex flex-col">

                {latestChapter.map(chapter => <li key={chapter.slug} className="first:border-border">
                  <ChapterBox
                    slug={chapter.slug}
                    chapterName={chapter.chapTitle}
                    chapterNum={chapter.chapNum}
                    currentNum={slug === chapter.slug}
                  />
                </li>)}
              </ul>
            </div>

          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>


    {/* This view for mobile view  */}
    <div className="md:hidden">

      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger asChild>
          <Button variant="ghost" className="w-10 rounded-full px-0 bg-transparent hover:bg-gray-400/15 bg-opacity-20">
            <List className="h-5 w-5" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className={cn("-px-4 rounded-t-lg overflow-y-scroll h-3/4")}>
          <SheetClose className={cn("hidden")} />
          <div className={cn(" flex flex-row row-span-2 w-full h-auto  ")}>
            <ul className="flex flex-col">

              {latestChapter.map((chapter) => <li key={chapter.slug} className="first:border-border">
                <ChapterBox

                  slug={chapter.slug}
                  chapterName={chapter.chapTitle}
                  chapterNum={chapter.chapNum}
                  currentNum={(slug) === chapter.slug}
                />
              </li>)}
            </ul>
            <ul className="flex flex-col">

              {latestChapter.map(chapter => <li key={chapter.slug} className="first:border-border">
                <ChapterBox
                  slug={chapter.slug}
                  chapterName={chapter.chapTitle}
                  chapterNum={chapter.chapNum}
                  currentNum={slug === chapter.slug}
                />
              </li>)}
            </ul>
          </div>
        </SheetContent>

      </Sheet>
    </div>
  </>
  )
}



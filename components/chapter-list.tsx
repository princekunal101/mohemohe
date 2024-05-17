'use client'

import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { List } from "lucide-react";
import { cn, getBooksBySlug, getChapterByBookPaths, sortByChapters } from "@/lib/utils";
import { Chapter, chapters } from "@/.velite";
import ChapterBox from "./chapter-box";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { slug } from "github-slugger";

interface ChapPageProps {
  slug: string;
  isSticky: boolean;
  bookName: string;
}


export function ChapterList({ slug, isSticky, bookName }: ChapPageProps) {

  const [open, setOpen] = useState(false);

  // fetch the current book from books
  const itemBooks = getBooksBySlug(chapters.filter((chapter) => chapter.published));
  const bookItems = itemBooks.filter(book => {
    const category = book.slugAsParams.split('/')[0];
    if (bookName === category) {
      // console.log(book)
      return book
    };
  })
  
  const indexChapter = getChapterByBookPaths(chapters.filter((chapter) => chapter.published), bookName);

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
          <NavigationMenuContent className={`absolute h-[auto] w-[544px] mt-8 rounded-lg p-3 -ml-2 left-0 border  ${isSticky ? "backdrop-blur-2xl supports-[backdrop-filter]:bg-background/95" : ""}  items-center backdrop-blur-2xl  border-zinc-400/45 shadow-lg `}>

            <div className={cn(" flex flex-col row-span-2 w-full h-auto")}>
              <div className="my-2" >

                <ChapterBox
                  slug={bookItems[0].slug}
                  chapterName={bookItems[0].chapTitle}
                  chapterNum={bookItems[0].chapNum}
                  currentNum={(slug) === bookItems[0].slug}
                />
              </div>

              <div className={cn(" flex flex-row  w-full h-auto border-t  py-2")}>
                <div className="grid w-full grid-cols-1 sm:grid-cols-2">

                  {indexChapter.map((chapter) =>
                    <ChapterBox
                      key={chapter.slug}
                      slug={chapter.slug}
                      chapterName={chapter.chapTitle}
                      chapterNum={chapter.chapNum}
                      currentNum={(slug) === chapter.slug}
                    />
                  )}
                </div>
              </div>
              <div className=" border-t py-2" >

                <ChapterBox
                  slug={"learn"}
                  chapterName={"Learn more books"}
                  chapterNum={-1}
                />
              </div>
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

        <SheetContent side="bottom" className={cn("px-4 rounded-t-lg overflow-y-scroll h-4/5")}>
          <SheetClose className={cn("hidden")} />
          <div className={cn(" flex flex-col  justify-evenly w-full h-auto  ")}>
            
            <div className=" py-2" >
              <ChapterBox
                slug={bookItems[0].slug}
                chapterName={bookItems[0].chapTitle}
                chapterNum={bookItems[0].chapNum}
                currentNum={(slug) === bookItems[0].slug}
              />
            </div>

            <div className={cn(" flex flex-row  w-full h-auto border-t py-2")}>
              <div className="grid w-full grid-cols-1 sm:grid-cols-2">

                {indexChapter.map((chapter) =>
                  <ChapterBox
                    key={chapter.slug}
                    slug={chapter.slug}
                    chapterName={chapter.chapTitle}
                    chapterNum={chapter.chapNum}
                    currentNum={(slug) === chapter.slug}
                  />
                )}
              </div>
            </div>

            <div className="py-2 border-t" >
              <ChapterBox
                slug={"learn"}
                chapterName={"Learn more books"}
                chapterNum={-1}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </>
  )
}



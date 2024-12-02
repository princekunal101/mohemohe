'use client'

import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { List } from "lucide-react";
import { cn, createPairedChapters, getBooksBySlug, getChapterByBookPaths, sortByChapters } from "@/lib/utils";
import { Chapter, chapters } from "@/.velite";
import ChapterBox, { ChapterIntroBox } from "./chapter-box";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
  const pairedChap = createPairedChapters(indexChapter);
  // const midIndex = Math.ceil(indexChapter.length / 2);
  // const firstHalfChap = indexChapter.slice(0, midIndex);   // for the first half chapter
  // const secondHalfChap = indexChapter.slice(midIndex);    // for the second half of the chapter
  // //paring with row wise.
  // const pairedChap = firstHalfChap.map((item, index) => {
  //   const secondItem = secondHalfChap[index];
  //   return [item, secondItem || { id: 0, value: 'null' }];
  // });

  return (<>
    <div className="hidden md:block">

      <DropdownMenu.Root >
        {/* <NavigationMenuList className="center flex list-none rounded-[6px]  p-1 ">

        <NavigationMenuItem> */}
        <DropdownMenu.Trigger asChild>

          <Button variant="ghost" className="w-10 rounded-full px-0 bg-transparent hover:bg-gray-400/15 bg-opacity-20">
            <List className="h-5 w-5" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>

          <DropdownMenu.Content className={`absolute h-[auto] w-[544px] mt-8 rounded-lg p-3 -ml-2 left-0 border items-center backdrop-blur-xl shadow-lg `}>

            <div className={cn(" flex flex-col row-span-2 w-full h-auto")}>
              <div className="grid w-full grid-cols-2 my-2" >

                <ChapterIntroBox
                  key={bookItems[0].slug}
                  slug={bookItems[0].slug}
                  currentNum={(slug) === bookItems[0].slug}
                  isBNew={bookItems[0].isBNew}
                  isMod={bookItems[0].isMod}
                />
              </div>

              <div className={cn(" flex flex-row  w-full border-t py-2")}>
                <div className="grid w-full grid-cols-2">

                  {pairedChap.map((chapter) =>
                    <>
                      <ChapterBox
                        key={chapter[0].slug}
                        slug={chapter[0].slug}
                        chapterName={chapter[0].chapTitle}
                        chapterNum={chapter[0].chapNum}
                        currentNum={(slug) === chapter[0].slug}
                        isNew={chapter[0].isNew}
                        isMod={chapter[0].isMod}
                      />
                      <ChapterBox
                        key={chapter[1].slug}
                        slug={chapter[1].slug}
                        chapterName={chapter[1].chapTitle}
                        chapterNum={chapter[1].chapNum}
                        currentNum={(slug) === chapter[1].slug}
                        isNew={chapter[1].isNew}
                        isMod={chapter[1].isMod}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="grid w-full grid-cols-2 border-t py-2" >

                <ChapterIntroBox
                  key={slug}
                  slug={"learn"}
                  isNext={true}
                />
              </div>
            </div>

          </DropdownMenu.Content>
        </DropdownMenu.Portal>
        {/* </NavigationMenuItem>
      </NavigationMenuList> */}
      </DropdownMenu.Root>
    </div>
    {/* <NavigationMenu className="hidden md:block" >
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
                  chapterName={"Introduction"}
                  chapterNum={bookItems[0].chapNum}
                  currentNum={(slug) === bookItems[0].slug}
                  isBNew={bookItems[0].isBNew}
                  isNew={bookItems[0].isNew}
                  isMod={bookItems[0].isMod}
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
                      isNew={chapter.isNew}
                      isMod={chapter.isMod}
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
    </NavigationMenu> */}


    {/* This view for mobile view  */}
    <div className="md:hidden">

      <Sheet open={open} onOpenChange={setOpen} >
        <SheetTrigger asChild>
          <Button variant="ghost" className="w-10 rounded-full px-0 bg-transparent hover:bg-gray-400/15 bg-opacity-20">
            <List className="h-5 w-5" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className={cn("px-4 rounded-t-lg overflow-auto h-4/5")}>
          <SheetClose className={cn("hidden")} />
          <div className={cn(" flex flex-col justify-evenly w-full h-auto ")}>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 py-2" >
              <ChapterIntroBox
                key={bookItems[0].slug}
                slug={bookItems[0].slug}
                isBNew={bookItems[0].isBNew}
                currentNum={(slug) === bookItems[0].slug}
                isMod={bookItems[0].isMod}
              />
            </div>

            <div className={cn(" flex flex-row w-full h-auto border-t py-2")}>
              <div className="sm:grid hidden w-full grid-cols-2">

                {pairedChap.map((chapter) =>
                  <>
                    <ChapterBox
                      key={chapter[0].slug}
                      slug={chapter[0].slug}
                      chapterName={chapter[0].chapTitle}
                      chapterNum={chapter[0].chapNum}
                      currentNum={(slug) === chapter[0].slug}
                      isNew={chapter[0].isNew}
                      isMod={chapter[0].isMod}
                    />
                    <ChapterBox
                      key={chapter[1].slug}
                      slug={chapter[1].slug}
                      chapterName={chapter[1].chapTitle}
                      chapterNum={chapter[1].chapNum}
                      currentNum={(slug) === chapter[1].slug}
                      isNew={chapter[1].isNew}
                      isMod={chapter[1].isMod}
                    />
                  </>
                )}
              </div>


              <div className="grid w-full grid-cols-1 sm:hidden">

                {indexChapter.map((chapter) =>
                  <ChapterBox
                    key={chapter.slug}
                    slug={chapter.slug}
                    chapterName={chapter.chapTitle}
                    chapterNum={chapter.chapNum}
                    currentNum={(slug) === chapter.slug}
                    isNew={chapter.isNew}
                    isMod={chapter.isMod}
                  />
                )}
              </div>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 py-2 border-t" >
              <ChapterIntroBox
                key={slug}
                slug={"learn"}
                isNext={true}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div >
  </>
  )
}



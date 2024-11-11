'use client'
import { cn, getBooksBySlug } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChapterList } from "./chapter-list";
import { useEffect, useState } from "react";
import { chapters } from "@/.velite";
import { List } from "lucide-react";
import { BookCover } from "./book-items/book-cover";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import Image from "next/image";



interface ChapterPageProps {
  chapNum: number
  chapTitle: string
  slug: string
  bookName: string
}


export function ChapterHeader({ chapNum, chapTitle, slug, bookName }: ChapterPageProps) {

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

  // fetch the current book from books
  const itemBooks = getBooksBySlug(chapters.filter((chapter) => chapter.published));
  const bookItems = itemBooks.filter(book => {
    const category = book.slugAsParams.split('/')[0];
    if (bookName === category) {
      // console.log(book)
      return book
    };
  })

  if (!bookItems[0]) {
    notFound();
  }
  // Fetching the color of books
  const color = bookItems[0].bookColor

  // Displayable text from book name
  const bName = bookItems[0].bookName.split(' ');
  const firstLatter = bName.map(word => word.charAt(0));
  const bDisplayName = firstLatter.join('');

  // console.log(slug)

  return (<>
    <aside key={slug} className={cn(`z-10 px-3 sm:py-2 flex flex-row max-w-[1072px] h-auto min-h-14 items-center rounded-full bg-slate-300/15  ${isSticky ? "border lg:w-full left-4 right-4 lg:left-1/2 lg:right-[unset] lg:-translate-x-1/2 border-zinc-400/25 top-4 backdrop-blur-2xl shadow-sm fixed" : ""}`)}>
      <ChapterList slug={slug} isSticky={isSticky} bookName={bookName} />

      <div aria-hidden="true" className={cn(" w-[1px] h-9 ml-2.5 mr-3 bg-gray-400 hidden sm:block")} />
      <div className={cn(" w-[40px] h-full aspect-[3/4] bg-gradient-to-b items-center justify-between from-red-500 to-red-700 rounded-[1px] hidden sm:flex flex-col", {
        "from-white to-zinc-200 text-black": color === "white",
        "from-red-500 to-red-700 ": color === "red",
        " from-blue-500 to-blue-700 ": color === "blue",
        " from-sky-500 to-sky-700 ": color === "sky",
        " from-zinc-900 to-zinc-950 ": color === "black",
        " from-green-500 to-green-700 ": color === "green",
        " from-orange-500 to-orange-700 ": color === "orange",
        " from-rose-500 to-rose-700 ": color === "rose",

      })} >
        <div className={cn("absolute w-[40px]  aspect-[3/4] rounded-[1px] bg-red-20 shadow-inner overflow-hidden ")}>
          <Image className={cn("h-full w-full")} width="100" height="100" src="/forgud_cov.png" alt="cover" />
        </div>
        <p className={cn(" ml-1 mr-1 text-xs mt-3 text-center text-balance font-semibold uppercase text-white")}>{bDisplayName}</p>
        <p className={cn(" ml-1 mr-1 text-[5px] mb-1 text-center text-muted text-balance font-semibold")}>{siteConfig.title}</p>
      </div>
      {/* <BookCover slug=""/> */}

      <div className={cn(" flex flex-col ml-3")}>
        {chapNum >= 1 ? <><h3 className={cn("text-sd font-semibold")}>Chapter {chapNum}</h3>
          <p className={cn("text-sm font-medium text-muted-foreground")}>{chapTitle}</p>
        </> : chapNum === 0 ?
          <p className={cn("text-sm font-medium text-muted-foreground")}>{"Introduction"}</p>
          : <p className={cn("text-sm font-medium text-muted-foreground")}>{chapTitle}</p>
        }
      </div>

    </aside>

  </>
  )
}
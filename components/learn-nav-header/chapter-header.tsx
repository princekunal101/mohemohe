'use client'
import { cn, getBooksBySlug } from "@/lib/utils";
import { ChapterList } from "./chapter-list";
import { useEffect, useState } from "react";
import { chapters } from "@/.velite";
import { List } from "lucide-react";
import { siteConfig } from "@/config/site";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BookItemChapterHeader } from "../book-item-learn";
import ScrollToTopBottom from "../scroll-to-top-bottom";



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
  const bName = bookItems[0].chapTitle;
  const bDesc = bookItems[0].chapShortDesc;
  // const firstLatter = bName.map(word => word.charAt(0));
  // const bDisplayName = firstLatter.join('');

  // console.log(slug)

  return (<>
    <aside key={slug} className={`z-10 px-2 sm:py-2 md:px-5  flex flex-row justify-between max-w-[1072px] h-auto min-h-14 items-center rounded-full bg-secondary/60  ${isSticky ? "border lg:w-full left-4 right-4 lg:left-1/2 lg:right-[unset] lg:-translate-x-1/2 border-border/75 top-4 backdrop-blur-lg  shadow-xl fixed" : ""}`}>
      <div className="flex flex-row items-center">
        <ChapterList slug={slug} isSticky={isSticky} bookName={bookName} />

        <div aria-hidden="true" className=" w-[1px] h-9 ml-2.5 mr-3 border-l hidden md:block" />

        <div className="hidden md:block">
          <BookItemChapterHeader bookName={bName} bookShortDesc={bDesc} />
        </div>


        <div className=" flex flex-col ml-3">
          {chapNum >= 1 ? <><h3 className="text-sd font-semibold">Chapter {chapNum}</h3>
            <p className="text-sm font-medium text-muted-foreground">{chapTitle}</p>
          </> : chapNum === 0 ?
            <p className="text-sm font-medium text-muted-foreground">{"Introduction"}</p>
            : <p className="text-sm font-medium text-muted-foreground">{chapTitle}</p>
          }
        </div>
      </div>
      <ScrollToTopBottom />
    </aside>

  </>
  )
}
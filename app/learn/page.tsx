import { chapters } from "@/.velite";
import { BookCover } from "@/components/book-items/book-cover";
import ChapterBox from "@/components/chapter-box";
import { ChapterHeader } from "@/components/chapter-header";
import { cn, getBooksBySlug, sortByChapters } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "The Best Learning Platform ",
  description: "Choose a book for a day and Add a step for success."
}

export default function LearnPage() {
  // const latestChapter = sortByChapters(chapters.filter((chapter) => chapter.published)).slice(0, 5);
  const itemBooks = getBooksBySlug(chapters.filter((chapter) => chapter.published));

  // const category = slug.split('/')[0];
  return (<div className={cn("container px-4 sm:px-6 md:px-8 max-w-4xl py-6 lg:py-10")}>
    <div className="flex flex-col items-start gap-4 md:flex-row md:justify-center">
      <div className="flex-1 space-y-4">
        <h1 className=" inline-block font-black text-4xl lg:text-5xl">Learn</h1>
        <p className="text-xl text-muted-foreground">
        Choose a book for a day and Add a step for success.
        </p>
      </div>
    </div>
    <hr className="my-8" />


    {/* <BookCover slug="/" /> */}
    <div className=" grid grid-cols-2 md:grid-cols-4 gap-8 mt-4 px-2">
      {itemBooks.map(chapter =>
        <BookCover
          key={chapter.slug}
          slug={chapter.slug}
          bName={chapter.bookName}
          bColor={chapter.bookColor}
          isBNew={chapter.isBNew}
          isMod={chapter.isMod}

        />
      )}
    </div>
    {/* <ul className="flex flex-col">
      {itemBooks.map(chapter => <li key={chapter.slug} className="first:border-border">
        <ChapterBox
          key={chapter.slug}
          slug={chapter.slug}
          chapterName={chapter.bookName}
          chapterNum={chapter.chapNum}

        />
      </li>)}
    </ul> */}

  </div>
  )
}
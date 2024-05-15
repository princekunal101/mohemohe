import { chapters } from "@/.velite";
import { BookCover } from "@/components/book-items/book-cover";
import ChapterBox from "@/components/chapter-box";
import { ChapterHeader } from "@/components/chapter-header";
import { cn, getBooksBySlug, sortByChapters } from "@/lib/utils";
import { slug } from "github-slugger";

// for specifying the books
// export function BookName(){
//  const h ="/"
//   return h;
// }

export default function LearnPage() {
  // const latestChapter = sortByChapters(chapters.filter((chapter) => chapter.published)).slice(0, 5);
  const itemBooks = getBooksBySlug(chapters.filter((chapter) => chapter.published));

  // const category = slug.split('/')[0];
  return (<div className={cn("container max-w-4xl items-center")}>
    <h2 className={cn("text-3xl font-bold mt-4 ")}>Books</h2>
    <BookCover slug="/" />
    <div className=" flex flex-wrap gap-5 mt-4">
      {itemBooks.map(chapter => 
        <BookCover
          key={chapter.slug}
          slug={chapter.slug}
          bName={chapter.bookName}
          bColor={chapter.bookColor}

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
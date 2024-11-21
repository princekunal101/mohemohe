import { chapters } from "@/.velite";
import BookItemLearn, { BookMainItemLearn } from "@/components/book-item-learn";
import LearnChapterItems from "@/components/chapter-item-learn";
import { buttonVariants } from "@/components/ui/button";
import { cn, getBooksBySlug, getChapterByBookPaths, } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "The Best Learning Platform ",
  description: "Choose a book for a day and Add a step for success.",


}

export default function LearnPage() {
  // const latestChapter = sortByChapters(chapters.filter((chapter) => chapter.published)).slice(0, 5);
  const itemBooks = getBooksBySlug(chapters.filter((chapter) => chapter.published));

  const bookItems = itemBooks.filter(book => {
    const category = book.slugAsParams.split('/')[0];
    // if (itemBooks === category) {
    return category;
    // };
  })

  // console.log(bookItems[1].slugAsParams)
  const indexChapter = getChapterByBookPaths(chapters.filter((chapter) => chapter.published), 'web-technology');
  // indexChapter.map((a) => console.log(a.slug))
  // const category = slug.split('/')[0];
  return (
    <div className="relative flex flex-col  py-12 md:pt-32 ">

      <section className="space-y-6">
        <div className="container px-4 sm:px-6 md:px-8  flex flex-col gap-4 text-center">
          <h1 className=" px-4 text-4xl md:text-6xl lg:text-7xl mb-4 font-semibold text-balance">
            Start Learning with us!
          </h1>
          <p className="max-w-[42rem] w-[90%] mx-auto mb-10 md:mb-16 text-muted-foreground sm:text-lg text -balance">
            Evolve from a beginner to a speialist by learning the essential principles of computer science and creating real-world applications that highlight your knowledge.
          </p>
        </div>

      

        <div className="container">
          <BookMainItemLearn
            slug={bookItems[1].slug}
            bookName={bookItems[1].chapTitle}
            bookDesc={bookItems[1].chapDesc}
            bookShortDesc={bookItems[1].chapShortDesc} />
        </div> 
         
         {/* <div className="absolute inset-0 h-screen -top-20  mt-0 w-full">
          <Image height={100} width={10} src={"/images/learn-og-bg.png"} className="w-full h-full object-fill" alt="hero" />
        </div> */}


        <div className="container w-full relative grid gap-4 justify-center mt-12">

          {itemBooks.map(chapter =>
            <BookItemLearn
              key={chapter.slug}
              slug={chapter.slug}
              bookName={chapter.chapTitle}
              bookDesc={chapter.chapDesc}
              bookShortDesc={chapter.chapShortDesc}
            />
          )}

        </div>
      </section>



      {/* <section className="container px-4 sm:px-6 md:px-8 max-w-6xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-center">
          <div className="flex-1 space-y-4">
            <h1 className=" inline-block font-black text-4xl lg:text-5xl">Learn</h1>
            <p className="text-xl text-muted-foreground">
              Choose a book for a day and Add a step for success.
            </p>
          </div>
        </div>
        <hr className="my-8" /> */}


      {/* <BookCover slug="/" /> */}
      {/* <div className=" grid grid-cols-2 md:grid-cols-4 gap-8 mt-4 px-2">
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
        </div> */}
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

      {/* </section> */}

      <section className="px-4 mx-auto mt-16 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <h2 className=" font-medium text-lg">Let&apos;s learn!</h2>
          <div className="ml-1 font-medium text-muted-foreground">Here we will be cover.</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-4">

          {indexChapter.map((chapter) =>
            <LearnChapterItems
              key={chapter.slug}
              slug={chapter.slug}
              chapterName={chapter.chapTitle}
              chapterNum={chapter.chapNum}
              chapterShortDesc={chapter.chapShortDesc} />
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Link href={bookItems[2].slug} className={cn(buttonVariants({ size: "lg" }), "w-full md:w-fit")}>
            Start Learning <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

        </div>
      </section>
    </div>
  )
}
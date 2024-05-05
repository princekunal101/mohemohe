import { chapters } from "@/.velite";
import { ChapterHeader } from "@/components/chapter-header";
import { MDXContent } from "@/components/mdx-components";
import { Tag } from "@/components/tag";
import { cn, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";



interface ChapterPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromPrams(params: ChapterPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const chapter = chapters.find((chapter) => chapter.slugAsParams === slug);

  return chapter;
}


export async function generateStaticParams(): Promise<ChapterPageProps["params"][]> {
  return chapters.map((chapter) => ({ slug: chapter.slugAsParams.split("/") }));

}

export default async function LearnChapter({ params }: ChapterPageProps) {

  const chapter = await getPostFromPrams(params);

  if (!chapter || !chapter.published) {
    notFound();
  }

  const dateTitle = (chapter.publishedDate === chapter.updatedDate ? "Published on: " : "Last updated: ");


  return (<div className={cn(" mx-auto px-4 mt-10 max-w-5xl")}>
    {/* <div className={cn(" z-20 h-[67px]")}> */}
    <ChapterHeader
      chapNum={chapter.chapNum}
      chapTitle={chapter.chapTitle} />
    {/* </div> */}
    <article className="px-1 sm:px-1 md:px-4  py-6 prose dark:prose-invert max-w-6xl">
      
      <div className={cn(" mb-8 flex w-full flex-col  gap-3 md:flex-row")}>
        <div className={cn(" w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center bg-secondary rounded-full")}>
          <p className={cn(" text-3xl sm:text-5xl font-bold m-0 text-inherit")}>{chapter.chapNum}</p></div>
        <div className={cn("flex flex-col")}>
          <p className={cn("text-lg my-0 font-medium  text-muted-foreground hidden md:block")}>Chapter {chapter.chapNum}</p>
          <h1 className={cn("mb-1 font-bold")}>{chapter.chapTitle}</h1>
   </div> 
      </div>{chapter.chapDesc? (
        <p className=" text-md my-5 ">{chapter.chapDesc}</p>
      ) : null}
     
      <div className="flex gap-2 mb-2">
        {chapter.tags?.map(tag => <Tag tag={tag} key={tag} />
        )}
      </div>
      

      <time className="text-wrap my-2 text-sm font-semibold" dateTime={chapter.updatedDate}>{dateTitle + formatDate(chapter.publishedDate)}</time>

      <hr className="mb-4 mt-2" />

      <MDXContent code={chapter.body} />
    </article>
  </div>
  )
}
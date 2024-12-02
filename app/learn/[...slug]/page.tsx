import { chapters } from "@/.velite";
import { ChapterHeader } from "@/components/learn-nav-header/chapter-header";
import "@/styles/mdx.css";
import { cn, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Metadata, ResolvingMetadata } from "next";

import { Icons } from "@/components/icons";
import { MDXContent } from "@/components/mdx/mdx-components";


interface ChapterPageProps {
  params: {
    slug: string[];
  };
}


export async function getChapterFromPrams(params: ChapterPageProps["params"]) {
  const slug = params.slug.join("/");
  const chapter = chapters.find((chapter) => chapter.slugAsParams === slug);
  // console.log(params)
  return chapter;
}

// for generating dynamic meta data & og and twitter images, 
export async function generateMetadata(
  { params, }: ChapterPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const chapter = await getChapterFromPrams(params);

  if (!chapter || !chapter.published) {
    return {
      title: "Page Not Found",
      description: "The requested page could not br found.",

    };
  }

  const chapterNum = chapter.chapNum <= 0 ? 1 : chapter.chapNum;
  
  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", chapter.chapTitle);
  ogSearchParams.set("book", chapter.bookName);
  ogSearchParams.set("chapter", chapterNum.toString());
  return {
    title: chapter.chapTitle,
    description: chapter.chapDesc,

    authors: { name: siteConfig.author },
    openGraph: {
      title: chapter.chapTitle,
      description: chapter.chapDesc,

      type: "article",
      url: chapter.slug,
      images: [
        {
          url: `/api/learn-og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: chapter.chapTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: chapter.chapTitle,
      description: chapter.chapDesc,
      images: [`/api/learn-og?${ogSearchParams.toString()}`],
    }


  }
}

// generating all static file for the static pages
export async function generateStaticParams(): Promise<ChapterPageProps["params"][]> {
  return chapters.map((chapter) => ({ slug: chapter.slugAsParams.split("/") }));

}

export default async function LearnChapter({ params }: ChapterPageProps) {

  const chapter = await getChapterFromPrams(params);

  // if chapter is not found as link is provided
  if (!chapter || !chapter.published) {
    notFound();
  }

  // const dateTitle = (chapter.publishedDate === chapter.updatedDate ? ("Published on: " + formatDate(chapter.publishedDate)) : ("Last updated: " + formatDate(chapter.updatedDate)));
  const dateTitle = (chapter.publishedDate === chapter.updatedDate ? ("Published on: ") : ("Last updated: "));

  const githubLink = (siteConfig.links.github + "/tree/master/content/" + (chapter.slug.split("/").pop() === params.slug[0] ? chapter.gitLinks + "/index" : chapter.gitLinks));

  return (<div className="relative mx-auto px-4 py-4 max-w-screen-lg md:py-4">
    <div className=" relative lg:-mx-12 h-[67px] md:mb-4 lg:mb-8 max-w-[1072px]">
      {/* Adding chapter nav bar */}
      <ChapterHeader
        chapNum={chapter.chapNum}
        chapTitle={chapter.chapTitle}
        slug={chapter.slug}
        bookName={params.slug[0]} />
    </div>
    <article className="w-full px-1 sm:px-1 md:px-4 py-6 prose dark:prose-invert max-w-6xl">

      {chapter.chapNum >= 1 ? <div className=" flex w-full flex-col gap-3 md:flex-row mb-4 md:m-0">
        <div className=" w-14 h-14 sm:w-20 sm:h-20 flex flex-shrink-0 items-center justify-center bg-secondary/60 rounded-full">
          <p className=" text-3xl sm:text-5xl font-bold m-0 text-inherit">{chapter.chapNum}</p></div>
        <div className="flex flex-col">
          <p className="text-md my-0 font-medium  text-muted-foreground hidden md:block">Chapter {chapter.chapNum}</p>
          <h1 className="sm:text-4xl mb-0 text-2xl font-bold">{chapter.chapTitle}</h1>
        </div>
      </div>
        : <h1 className="mb-1 sm:text-4xl text-2xl font-bold">{chapter.chapTitle}</h1>}
      {/* {chapter.chapDesc ? (
        <p className={cn(" text-md my-2 sm:my-5")}>{chapter.chapDesc}</p>
      ) : null} */}

      {/* <div className="flex gap-2 mb-2">
        {chapter.tags?.map(tag => <Tag tag={tag} key={tag} />
        )}
      </div> */}



      <MDXContent code={chapter.body} />

      <div className="flex w-full gap-2 justify-between px-2">
        <a className="flex gap-2 items-center" target="_blank" href={githubLink + ".mdx"}>
          <Icons.github className="h-7 w-7" />
          <p className="flex text-wrap my-2 text-sm font-semibold">Help us <span className="hidden sm:flex">&nbsp;to improve content</span></p>
        </a>
        <time className="text-right text-wrap my-2 text-sm font-semibold" dateTime={chapter.updatedDate}>{dateTitle + formatDate(chapter.updatedDate)}</time>
      </div>
    </article>

  </div>
  )
}
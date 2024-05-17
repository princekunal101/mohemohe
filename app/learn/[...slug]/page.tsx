import { chapters } from "@/.velite";
import { ChapterHeader } from "@/components/chapter-header";
import { MDXContent } from "@/components/mdx-components";
import "@/styles/mdx.css";
import { cn, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Metadata, ResolvingMetadata } from "next";


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
      description: "The requested page could not br found."
    };
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", chapter.chapTitle)
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
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 680,
          alt: chapter.chapTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: chapter.chapTitle,
      description: chapter.chapDesc,
      images: [`/api/og?${ogSearchParams.toString()}`],
    }


  }
}

// generating all static file for the static pages
export async function generateStaticParams(): Promise<ChapterPageProps["params"][]> {
  return chapters.map((chapter) => ({ slug: chapter.slugAsParams.split("/") }));

}

export default async function LearnChapter({ params }: ChapterPageProps) {

  const chapter = await getChapterFromPrams(params);
  // const router = useRouter();

  // console.log(params.slug[0])

  // if chapter is not found as link is provided
  if (!chapter || !chapter.published) {
    notFound();
  }

  const dateTitle = (chapter.publishedDate === chapter.updatedDate ? "Published on: " : "Last updated: ");


  return (<div className={cn("relative mx-auto px-4 py-4 max-w-screen-lg md:py-4")}>
    <div className={cn(" relative lg:-mx-12 h-[67px] lg:mb-8 max-w-[1072px]")}>
      {/* Adding chapter nav bar */}
      <ChapterHeader
        chapNum={chapter.chapNum}
        chapTitle={chapter.chapTitle}
        slug={chapter.slug}
        bookName={params.slug[0]} />
    </div>
    <article className="w-full  px-1 sm:px-1 md:px-4  py-6 prose dark:prose-invert max-w-6xl">

      {chapter.chapNum >= 1 ? <div className={cn(" mb-2 flex w-full flex-col  gap-3 md:flex-row")}>
        <div className={cn(" w-14 h-14 sm:w-20 sm:h-20 flex flex-shrink-0 items-center justify-center bg-secondary rounded-full")}>
          <p className={cn(" text-3xl sm:text-5xl font-bold m-0 text-inherit")}>{chapter.chapNum}</p></div>
        <div className={cn("flex flex-col")}>
          <p className={cn("text-lg my-0 font-medium  text-muted-foreground hidden md:block")}>Chapter {chapter.chapNum}</p>
          <h1 className={cn("mb-1 sm:text-4xl text-2xl font-bold")}>{chapter.chapTitle}</h1>
        </div>
      </div> : <h1 className={cn("mb-1 sm:text-4xl text-2xl font-bold")}>{chapter.bookName}</h1>}
      {chapter.chapDesc ? (
        <p className={cn(" text-md my-2 sm:my-5")}>{chapter.chapDesc}</p>
      ) : null}

      {/* <div className="flex gap-2 mb-2">
        {chapter.tags?.map(tag => <Tag tag={tag} key={tag} />
        )}
      </div> */}



      <MDXContent code={chapter.body} />
      <div className=" text-right px-2">
        <time className="text-wrap my-2 text-sm font-semibold" dateTime={chapter.updatedDate}>{dateTitle + formatDate(chapter.publishedDate)}</time>
      </div>
    </article>
  </div>
  )
}
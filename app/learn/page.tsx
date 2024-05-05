import { chapters } from "@/.velite";
import ChapterBox from "@/components/chapter-box";
import { ChapterHeader } from "@/components/chapter-header";
import { cn, sortByChapters } from "@/lib/utils";


export default function LearnPage() {
  const latestChapter = sortByChapters(chapters.filter((chapter) => chapter.published)).slice(0, 5);

  return (<div className={cn("container max-w-4xl items-center")}>
    
    <ul className="flex flex-col">
          {latestChapter.map(chapter => <li key={chapter.slug} className="first:border-border">
            <ChapterBox
              slug={chapter.slug}
              chapterName={chapter.chapTitle}
              chapterNum={chapter.chapNum}
              />
          </li>)}
        </ul>
        
  </div>
  )
}
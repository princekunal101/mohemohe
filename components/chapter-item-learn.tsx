import { LucideInfo, MoveUpRight } from "lucide-react";
import Link from "next/link";

interface LearnChapterItemsProps {
  slug: string;
  chapterName: string;
  chapterNum: number;
  chapterShortDesc?: string;
}

export default function LearnChapterItems({ slug, chapterNum, chapterName, chapterShortDesc }: LearnChapterItemsProps) {
  return (
    <div className="flex group border rounded-xl shadow">
      <Link className="p-6 flex flex-col" href={slug}>
        <div className="flex flec-row items-center gap-3 pb-2">
          <div className="w-8 h-8 flex flex-shrink-0 justify-center items-center text-sm text-blue-500 font-bold text-center bg-blue-500/20 rounded-full group-hover:bg-zinc-900 dark:group-hover:bg-gray-100 group-hover:text-white dark:group-hover:text-black">
            <div className="group-hover:hidden">
              {chapterNum === 0 ? <LucideInfo className="w-5" /> : chapterNum}
            </div>
            <MoveUpRight className="hidden h-5 group-hover:block" />
          </div>
          <p className="font-semibold text-lg">{chapterName}</p>
        </div>

        <div className=" line-clamp-2 text-muted-foreground text-sm">{chapterShortDesc}</div>
      </Link>
    </div>)
}
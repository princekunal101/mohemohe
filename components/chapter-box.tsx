import { cn } from "@/lib/utils";
import Link from "next/link";
import { badgeVariants } from "./ui/badge";

interface ChapterProps {
  slug: string;
  chapterNum: number;
  currentNum?: boolean;
  chapterName?: string;

}
export default function ChapterBox({ slug, currentNum, chapterName, chapterNum }: ChapterProps) {

  return (<Link className={cn(" p-2 gap-3 grid-rows-2 group flex items-center h-auto rounded-md hover:bg-secondary")} href={"/" + slug}>

    <div className={(badgeVariants({ variant: currentNum ? "default" : "secondary", className: " w-8 h-8 rounded-full flex justify-center group-hover:bg-gray-300 bg-blue-100" }))}>
      <p className={cn(" text-center font-extrabold group-hover:text-gray-600 text-blue-500")}>{chapterNum}</p>
    </div>
    <div className={cn("flex flex-col")}>
      <p className={cn("text-sm font-medium text-gray-600 dark: prose")}>Chapter {chapterNum}</p>
      <p className={cn("text-sm font-semibold")}>{chapterName}</p>
    </div>

  </Link>)
}
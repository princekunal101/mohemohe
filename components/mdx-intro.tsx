import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ChapIntroProps {
  children?: ReactNode;
  txCenter?: boolean;

}

export function ChapIntro({
  children,
  txCenter = false,

  ...props
}: ChapIntroProps) {
  return (<div className={cn(" my-2 md:-mx-10 md:p-10 md:my-4 md:rounded-md md:bg-gray-100 md:dark:bg-gray-800 ")}><h3 className={cn("my-0")}>In this chapter...</h3>
    <p className={cn("mb-2 text-sm")}>Here are the topics we&apos;ll cover</p>
    <div className={cn(`my-0 items-start rounded-md border border-inherit bg-background shadow-md p-4 dark:max-w-none ${txCenter ? "text-center" : null}`)}
      {...props}>
      <ul className={cn("my-2 px-0")}>{children}</ul>
    </div>
  </div>)
}

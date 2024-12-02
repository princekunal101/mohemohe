import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";
import { buttonVariants } from "../ui/button";

interface ChapIntroProps {
  children?: ReactNode;
  nextChap: number;
  nextChapName: string;
  nextChapLink: string;

}

export function NextUp({
  children,
  nextChap,
  nextChapName,
  nextChapLink,

  ...props
}: ChapIntroProps) {
  return (
    <div className="w-full my-8 flex flex-row justify-center">
      <div className="p-4 w-full max-w-lg border border-inherit rounded-lg shadow-xl text-center">
        <p className="my-2 text-sm">Next Up</p>
        <h2 className="my-2 ">{nextChap}: {nextChapName}</h2>
        <p className="my-3 text-sm">{children}</p>


        <Link href={"/learn" + nextChapLink} className={cn(buttonVariants({ size: "lg" }), "w-full md:w-fit my-4 text-md no-underline")}>
          Start Chapter {nextChap} &#10132;
        </Link>

      </div>
    </div>
  )
}

import Link from "next/link"
import { Icons } from "./icons"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"

interface BookItemLearnProps {
  slug: string
  bookName: string
  bookDesc?: string
  bookShortDesc?: string
}

export default function BookItemLearn({ slug, bookName, bookDesc, bookShortDesc }: BookItemLearnProps) {
  return (
    <div className="w-full lg:max-w-3xl shadow flex flex-col md:flex-row items-center justify-center md:justify-left border rounded-xl p-4">
      <div className=" flex justify-center">
        <div className="w-20 relative flex aspect-[3/4] shrink-0 shadow-inner-bl bg-green-900 overflow-hidden rounded-[3px]">
          <div className="h-full w-1 bg-gradient-to-r from-black/25 from-30% via-white/75 via-55% to-white/45 to-80%" />
          <div className="h-full w-0.5 bg-gradient-to-r from-white/45 from-30% to-black/15 " />
          <div className="h-full w-1 bg-gradient-to-r from-black/15 from-10% via-white/40  to-white/10 to-95%" />
          <div className="h-full w-2 bg-gradient-to-r from-white/10  to-transparent " />
          <div className="absolute w-full flex-1 px-2 py-1.5 justify-center text-zinc-100 text-center">
            <p className=" w-full mb-0.5 font-bold line-clamp-2 text-[0.55rem] opacity-95">{bookName}</p>
            <p className=" text-[0.35rem]  line-clamp-3 opacity-95">{bookShortDesc}</p>
          </div>
          <div className="absolute w-full justify-center flex bottom-1 text-white/95">
            <Icons.logo className="w-8 h-8" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-8 md:mt-0 gap-1 md:ml-4 items-center md:items-start text-center md:text-start">
        <p className="font-semibold w-[95%] line-clamp-1 text-xl">{bookName} </p>
        <p className="line-clamp-3 w-[85%] text-sm text-muted-foreground">{bookDesc} </p>
      </div>

      <div className="flex w-full md:w-min justify-center mt-4 md:mt-0">
        <Link href={slug} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full md:w-fit")}>
          Start Learning <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}


export function BookMainItemLearn({ slug, bookName, bookDesc, bookShortDesc }: BookItemLearnProps) {
  return (
    <div className="flex justify-center bg-background pt-20">
      <div className="w-full lg:max-w-3xl shadow flex flex-col items-center justify-center border rounded-xl p-4">
        <div className="w-full flex justify-center -mt-16">
          <div className="w-40 relative flex aspect-[3/4] shadow-inner-bl bg-green-900 overflow-hidden rounded">
            <div className="h-full w-2 bg-gradient-to-r from-black/25 from-30% via-white/75 via-55% to-white/45 to-80%" />
            <div className="h-full w-1 bg-gradient-to-r from-white/45 from-30% to-black/15 " />
            <div className="h-full w-2 bg-gradient-to-r from-black/15 from-10% via-white/40  to-white/10 to-95%" />
            <div className="h-full w-4 bg-gradient-to-r from-white/10  to-transparent " />
            <div className="absolute w-full flex-1 p-3 text-zinc-100 justify-center text-center">
              <p className=" w-full mb-2 text-balance font-bold opacity-95">{bookName}</p>
              <p className=" line-clamp-4 text-[0.7rem] opacity-95">{bookShortDesc}</p>
            </div>
            <div className="absolute w-full justify-center flex bottom-3 text-white/95">
              <Icons.logo className="w-14 h-14" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center text -balance text-center mt-8">
          <h2 className="font-bold mb-2 text-xl">{bookName}</h2>
          <p className="mb-2 w-[80%] line-clamp-3 text-muted-foreground">{bookDesc}</p>
          <div className="w-full h-px my-4 bg-gray-500/10" />
          <div className="flex w-full justify-center my-4">
            <Link href={slug} className={cn(buttonVariants({ size: "lg" }), "w-full md:w-fit")}>
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
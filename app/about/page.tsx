import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description: "Information about us",
}

export default async function AboutPage() {
  return (<div className="container px-4 sm:px-6 md:px-8 max-w-[1024px] py-6 lg:py-10">
    {/* <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
      <div className="flex-1 space-x-4">
        <h1 className=" inline-block font-black text-4xl lg:text-5xl">
          About us
        </h1>
      </div>
    </div>
    <hr className="my-8" /> */}
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center md:items-start">
      <div className=" max-w-48 hidden md:flex flex-col gap-2">
        <Avatar className="h-48 w-48">
          <AvatarImage src="/authors/prince-kunal.jpg" alt={siteConfig.author} />
          <AvatarFallback>PK</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col text-center md:text-start">
        <h2 className="text-2xl md:text-3xl font-bold  break-words">
          Hello, I am {siteConfig.author}
        </h2>
        <p className="text-muted-foreground  break-words my-3">
          I created {siteConfig.name} to help B.Tech (CSE) students to find their Goals and Notes, Learn their Syllabus in the easiest way.
        </p>

        <div className="flex flex-col gap-4 md:justify-start justify-center sm:flex-row">
          <Link href={"/blog"} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
            View Blogs
          </Link>
          <Link href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-fit")}>
            GitHub
          </Link>
        </div>
      </div>
    </div>
    <hr className="my-4" />
    <div className={cn("prose dark:prose-invert w-full max-w-full")}>
      <h3>What is {siteConfig.name} ?</h3>
      <p><strong>{siteConfig.name}</strong> is platform where the B.Tech (CSE) students can study freely online Anywhere Anytime.</p>
    </div>
  </div>
  )
}
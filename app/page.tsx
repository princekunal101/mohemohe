import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";


export const metadata: Metadata = {
  title: siteConfig.name + " | " + "The Best Learning Platform",
  // description: "Choose a book for a day and Add a step for success. A step for the success"
}

export default function Home() {
  const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(0, 5);
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container px-4 sm:px-6 md:px-8 flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Hello, This is mohe mohe
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to my learning templet. Built using <br /> tailwind, shadcn, velite and
            Nextjs 14.
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link href="/learn" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
              View Learning Subjects
            </Link>
            <Link href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-fit")}>
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section className="container px-4 sm:px-6 md:px-8 max-w-4xl py-6 lg:py-10 flex flex-col space-y-6">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map(post => <li key={post.slug} className="first:border-border">
            <PostItem
              slug={post.slug}
              title={post.title}
              description={post.description}
              publishedDate={post.publishedDate}
              updatedDate={post.updatedDate}
              tags={post.tags} />
          </li>)}
        </ul>
      </section>
    </>
  );
}

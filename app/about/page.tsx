import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: "About me",
  description: "Information about me",
}

export default async function AboutPage() {
  return (<div className="container max-w-6xl py-6 lg:py-10">
    <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
      <div className="flex-1 space-x-4">
        <h1 className=" inline-block font-black text-4xl lg:text-5xl">
          About Me
        </h1>
      </div>
    </div>
    <hr className="my-8" />
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="min-w-48 max-w-48 flex flex-col gap-2">
        <Avatar className="h-48 w-48">
          <AvatarImage src="https://avatars.githubusercontent.com/u/138247815?v=4" alt={siteConfig.author} />
          <AvatarFallback>PK</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold text-center break-words">
          {siteConfig.author}
        </h2>
        <p className="text-muted-foreground text-center break-words">
          Software Developer
        </p>
      </div>
      <p className=" text-muted-foreground text-lg py-4">

        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis dicta blanditiis, harum, ut, facere fugit necessitatibus labore mollitia placeat nulla alias! Veritatis fugiat illo ea voluptatibus cumque. Nemo, quis adipisci.
        Temporibus, voluptatibus ex cupiditate harum, rem accusamus beatae omnis nulla vitae ea illo unde, ipsa rerum ut numquam alias eius amet eaque expedita totam enim inventore vel officia sapiente. Est?
      </p>
    </div>
  </div>)
}
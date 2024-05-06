import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "404 Not Found",
  description: siteConfig.description,
};

export default function NotFound() {

  return (<section className={cn(" max-w-4xl prose dark:prose-invert container mt-8 flex flex-col w-full h-auto")}>
    <h2 className={cn("dark:prose-inverst")}>404 Not found </h2>
    <div className={cn("flex flex-row")}>
      <Image className={cn("hidden md:block mr-16")} width={300} height={300} src={"/sad-emoji.webp"} alt="Not found"></Image>
      <h1 className={cn("flex items-center my-16")}>Sorry! This page is Not Found please go Home</h1></div>

    <div className={cn("flex items-center justify-center")}> <Link className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit no-underline")} href={"/"}>
      Go To Home</Link>
    </div>
  </section>)
}
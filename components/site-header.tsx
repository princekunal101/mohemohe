import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="z-10 sticky top-0  w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 md:px-8 flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 item-center justify-end space-x-2">
          <nav className="flex items-center">

            <ModeToggle />
            <Link href={siteConfig.links.github} target="_blank" rel="noreferre">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 hidden sm:inline-flex")}>
                <Icons.github className="h-4 w-4 " />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>

            {/* <Link href={siteConfig.links.twitter} target="_blank" rel="noreferre">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 hidden sm:inline-flex")}>
                <Icons.twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>

            <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferre">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 hidden sm:inline-flex")}>
                <Icons.linkedIn className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </div>
            </Link> */}

            <Link href={siteConfig.links.instagram} target="_blank" rel="noreferre">
              <div className={cn(buttonVariants({ variant: "ghost" }), "w-10 px-0 hidden sm:inline-flex")}>
                <Icons.instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </div>
            </Link>

            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
"use client"

import Link from "next/link"
import { Icons } from "./icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-8 w-8 flex items-center justify-center rounded-md bg-slate-600 dark:bg-slate-400 bg-opacity-25 dark:bg-opacity-30" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
{/* 
      <Link href="/learn" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/learn" ? "text-foreground" : "text-foreground/60")}>
        Learn
      </Link> */}

      <Link href="/blog" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/blog" ? "text-foreground" : "text-foreground/60")}>
        Blog
      </Link>

      <Link href="/about" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/about" ? "text-foreground" : "text-foreground/60")}>
        About
      </Link>
    </nav>
  )
}
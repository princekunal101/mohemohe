"use client"

import Link from "next/link"

import { Icons } from "../icons"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center text-xl shrink-0 font-semibold">
        <Icons.logo className="h-14 w-14 flex flex-shrink-0 items-center justify-center" />
        <span>{siteConfig.name}</span>
      </Link>

      <Link href="/learn" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/learn" ? "text-foreground" : "text-foreground/60")}>
        Learn
      </Link>

      <Link href="/blog" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/blog" ? "text-foreground" : "text-foreground/60")}>
        Blog
      </Link>

      <Link href="/about" className={cn("text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block", pathname === "/about" ? "text-foreground" : "text-foreground/60")}>
        About
      </Link>
    </nav>
  )
}
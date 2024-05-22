"use client";

import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react"
import { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";


export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden bg-slate-300 bg-opacity-20">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-6">
        <SheetClose className={cn("absolute right-6 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary")}>
          <X className={cn(" w-5 h-5")} />
        </SheetClose>
        <MobileLink onOpenChange={setOpen} href="/" className="flex items-center mr-10">
          <Icons.logo className="mr-2 h-8 w-8 flex items-center justify-center rounded bg-black/80 dark:bg-white/25" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-6">
          <MobileLink onOpenChange={setOpen} href="/learn">
            Learn
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/blog">
            Blog
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink>
          <hr className="mr-2" />
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            Github
          </Link>
          {/* <Link target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            Twitter
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.linkedin}>
            LinkedIn
          </Link> */}
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.instagram}>
            Instagram
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void;
  className?: string;

}
function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();

  return (<Link
    href={href}
    onClick={() => {
      router.push(href.toString())
      onOpenChange?.(false)
    }}
    className={className}
    {...props}>
    {children}
  </Link>
  )
}
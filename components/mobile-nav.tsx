"use client";

import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react"
import { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";


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
      <SheetContent side="right">
        <MobileLink href="/" className="flex items-center">
          <Icons.logo className="mr-2 h-8 w-8 flex items-center justify-center rounded-md bg-slate-600 dark:bg-slate-400 bg-opacity-25 dark:bg-opacity-30" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href="/learn">
            Learn
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/blog">
            Blog
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/about">
            About
          </MobileLink>
          <hr className="mr-2"/>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
            Github
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
            Twitter
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.linkedin}>
            LinkedIn
          </Link>
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
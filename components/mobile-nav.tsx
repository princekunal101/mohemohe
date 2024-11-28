"use client";

import { Button, buttonVariants } from "./ui/button";
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
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="py-4 px-4">
        <SheetClose className="absolute right-8 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className=" w-5 h-5" />
        </SheetClose>
        <MobileLink onOpenChange={setOpen} href="/" className="flex items-center mr-10 text-xl font-semibold">
          <Icons.logo className=" h-14 w-14 flex flex-shrink-0 items-center justify-center rounded" />
          <span>{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col mt-2">
          <MobileLink onOpenChange={setOpen} href="/learn" className="px-3 rounded py-2 hover:bg-gray-500/10">
            Learn
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/blog" className="px-3 rounded py-2 hover:bg-gray-500/10">
            Blog
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/about" className="px-3 rounded py-2 hover:bg-gray-500/10">
            About
          </MobileLink>
          <hr className="m-2" />
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.github} className="px-3 py-1 rounded hover:underline text-sm ">
            Github
          </Link>
          {/* <Link target="_blank" rel="noreferrer" href={siteConfig.links.linkedin}>
            LinkedIn
            </Link> */}
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.instagram} className="px-3 py-1 rounded hover:underline text-sm ">
            Instagram
          </Link>
          <Link target="_blank" rel="noreferrer" href={siteConfig.links.x} className="px-3 py-1 rounded hover:underline text-sm ">
            X
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
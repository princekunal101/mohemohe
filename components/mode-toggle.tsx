"use client"

import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Check, Moon, Sun } from "lucide-react"


export function ModeToggle() {
  const { setTheme } = useTheme()
  const currTheme = useTheme().theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-10 px-0">
          <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${currTheme === "system"? "opacity-60":""}`} />
          <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${currTheme === "system"? "opacity-60":""}`} />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className=" justify-between">
          Light {currTheme === "light" ? (<Check className="w-4 h-4 text-blue-500" />) : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className=" justify-between">
          Dark {currTheme === "dark" ? (<Check className="w-4 h-4 text-blue-500" />) : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className=" justify-between">
          System {currTheme === "system" ? (<Check className="w-4 h-4 text-blue-500" />) : ""}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
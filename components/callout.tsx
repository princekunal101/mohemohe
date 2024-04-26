import { cn } from "@/lib/utils";
import { ReactNode } from "react";


interface CalloutProps {
  children?: ReactNode;
  type?: "default" | "warning" | "danger" | "knowing" | "notes";
}

export function Callout({
  children,
  type = "default",
  ...props
}: CalloutProps) {
  return <div className={cn("my-6 items-start rounded-md border border-l-4 p-4 w-full dark:max-w-none",
    {
      "border-red-500 bg-red-100 dark:prose": type === "danger",
      " border-yellow-500 bg-yellow-100 dark:prose": type === "warning",
      " border-green-500 bg-green-100 dark:prose": type === "knowing",
      " border-orange-500 bg-orange-100 dark:prose": type === "notes",

    }
  )}
    {...props}>
    <div>{children}</div>
  </div>


}
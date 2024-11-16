import { cn } from "@/lib/utils";
import { ReactNode } from "react";


interface CalloutProps {
  children?: ReactNode;
  type?: "default" | "warning" | "danger" | "knowing" | "notes";
  txCenter?: boolean;
  breakBefore?: boolean;
  id?:string;
}

export function Callout({
  children,
  type = "default",
  txCenter= false,
  breakBefore= false,
  id,
  ...props
}: CalloutProps) {
  return <div key={id} id={id} className={cn(`my-6 ${breakBefore? "break-before-page": ""} items-start rounded-md border border-l-4 p-4 w-full not-prose text-sm dark:max-w-none ${txCenter? "text-center":null}`,
    {
      "border-red-500 bg-red-100 dark:prose": type === "danger",
      " border-yellow-500 bg-yellow-100 dark:prose": type === "warning",
      " border-green-500 bg-green-100 dark:prose": type === "knowing",
      " border-orange-500 bg-orange-100 dark:prose": type === "notes",

    }
  )}
    {...props}>
  {children}
  </div>


}
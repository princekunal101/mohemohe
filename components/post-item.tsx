import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";


interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  publishedDate: string;
  updatedDate: string;
  tags?: Array<string>;
}

export function PostItem({ slug, title, description, publishedDate: publishedDate, updatedDate: updatedDate, tags }: PostItemProps) {

  const dateTitle = (publishedDate >= updatedDate ? ("Published on: " + formatDate(publishedDate)) : ("Last updated: " + formatDate(updatedDate)));

  return (
    <article className=" flex flex-col gap-1 border-border border-b py-2">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={"/" + slug}>{title}</Link>
        </h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags?.map(tag => <Tag tag={tag} key={tag} />)}
      </div>
      <div className="max-w-none text-muted-foreground">{description}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">{dateTitle}</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={updatedDate}>{dateTitle}</time>
          </dd>
        </dl>
        <Link href={"/" + slug} className={cn(buttonVariants({ variant: "link" }), "py-0")}>
          Read more &#10132;
        </Link>
      </div>
    </article>
  )
}
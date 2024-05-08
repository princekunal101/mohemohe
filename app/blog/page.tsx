import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortByUpdatedPosts, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "The Best Learning App",
  description: "This Contents are generated for BTech (CSE) students as per Syllabus."
}

const POST_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1
  const sortedPosts = sortPosts(posts.filter((post) => post.published)); //published posts
  // const sortedUpdatedPosts = sortByUpdatedPosts(posts.filter((post) => post.published)); //updsted posts
  // let sortedPosts = sortedUpdatedPosts;
  // (sortedPubPosts > sortedUpdatedPosts ? (sortedPosts = sortedPubPosts) : null)

  const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POST_PER_PAGE * (currentPage - 1),
    POST_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts.filter((post) => post.published));
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container px-4 sm:px-6 md:px-8 max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-center">
        <div className="flex-1 space-y-4">
          <h1 className=" inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            this is online learning pages.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">

          <hr className="mt-8" />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">

              {displayPosts.map((post) => {
                const { slug, publishedDate: publishedDate, updatedDate: updatedDate, title, description, tags } = post
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      publishedDate={publishedDate}
                      updatedDate={updatedDate}
                      title={title}
                      description={description}
                      tags={tags} />
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>Nothing is here yet!</p>
          )}
          <QueryPagination totalPages={totalPages} className=" justify-end mt-4" />
        </div>

        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sticky top-24 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardContent className="flex flex-wrap px-0 py-1 gap-2">
              {sortedTags?.map((tag) => (
                <Tag tag={tag} key={tag} count={tags[tag]} />
              ))}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
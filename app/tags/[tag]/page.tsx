import { posts } from "@/.velite";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from "@/lib/utils";
import { slug } from "github-slugger";
import { Metadata, ResolvingMetadata } from "next";


interface TagPageProps {
  params: {
    tag: string;
  }
}
// export async function generateMetaData({ 
//   params, 
// }: TagPageProps): Promise<Metadata> {
//   
//   
//   }
// }
export async function generateMetadata(
  { params, }: TagPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { tag } = params;
  const title = tag.split("-").join(" ");
  return {
    // title: tag,
    title: title[0].toUpperCase()+title.substring(1),
    description: `Posts on the topic ${title}`
  }
  
}


export const generateStaticParams = () => {
  const tags = getAllTags(posts.filter((post) => post.published));
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ")

  const displayPosts = getPostsByTagSlug(posts.filter((post) => post.published), tag);
  const tags = getAllTags(posts.filter((post) => post.published));
  const sortedTags = sortTagsByCount(tags)

  return (
    <div className="container px-4 sm:px-6 md:px-8 max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-center">
        <div className="flex-1 space-y-4">
          <h1 className=" inline-block font-black text-4xl lg:text-5xl capitalize">{title}</h1>

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
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sticky top-24 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardContent className="flex flex-wrap px-0 py-1 gap-2">
              {sortedTags?.map((t) => (
                <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
              ))}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
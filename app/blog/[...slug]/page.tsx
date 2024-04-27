import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Tag } from "@/components/tag";
import { formatDate } from "@/lib/utils";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromPrams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);


  return post;
}

// export async function generateMetaData({ params }: PostPageProps): Promise<Metadata> {
//   const post = await getPostFromPrams(params);

//   if (!post || !post.published) {
//     return {
//   title: "Page Not Found",
//   description: "The requested page could not br found."
// };
//   }

//   const ogSearchParams = new URLSearchParams();
//   ogSearchParams.set("title", post.title)
//   return {
//     title: post.title,
//     description: post.description,
//     authors: { name: siteConfig.author },
//     openGraph: {
//       title: post.title,
//       description: post.description,
//       type: "article",
//       url: post.slug,
//       images: [
//         {
//           url: `/api/og?${ogSearchParams.toString()}`,
//           width: 1200,
//           height: 630,
//           alt: post.title
//         }
//       ]
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.title,
//       description: post.description,
//       images: [`/api/og?${ogSearchParams.toString()}`],
//     }
//   }
// }

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));

}
export default async function PostPage({ params, }: PostPageProps) {
  const post = await getPostFromPrams(params);

  if (!post || !post.published) {
    notFound();
  }

  const dateTitle = (post.publishedDate === post.updatedDate ? "Published On " : "Updated At ");


  return <article className=" container px-4 sm:px-6 md:px-8 py-6 prose dark:prose-invert max-w-3xl">
    <h1 className="mb-2">{post.title}</h1>
    <div className="flex gap-2 mb-2">
      {post.tags?.map(tag => <Tag tag={tag} key={tag} />
      )}
    </div>
    {post.description ? (
      <p className=" text-xl m-0 text-muted-foreground">{post.description}</p>
    ) : null}

    <time className="text-wrap my-2 text-sm font-semibold" dateTime={post.updatedDate}>{dateTitle + formatDate(post.publishedDate)}</time>

    <hr className="mb-4 mt-2" />

    <MDXContent code={post.body} />
  </article>
}
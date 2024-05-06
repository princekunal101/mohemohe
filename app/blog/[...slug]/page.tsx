import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Tag } from "@/components/tag";
import { formatDate } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site";
import { resolve } from "path";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function getPostFromPrams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata(
  { params, }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const post = await getPostFromPrams(params);
 
if (!post || !post.published) {
  return {
    title: "Page Not Found",
    description: "The requested page could not br found."
  };
}

const ogSearchParams = new URLSearchParams();
ogSearchParams.set("title", post.title)
return {
  title: post.title,
  description: post.description,
  authors: { name: siteConfig.author },
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    url: post.slug,
    images: [
      {
        url: `/api/og?${ogSearchParams.toString()}`,
        width: 1200,
        height: 680,
        alt: post.title
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [`/api/og?${ogSearchParams.toString()}`],
  }

 
  }
}

// export const generateMetaData = async ({ 
//   params 
// }: PostPageProps): Promise<Metadata> => {

//   const title = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`helo ${params.slug}`);
//     }, 100);
//   });
//   return {
//     title: `title ${title}`,
//   };

// const post = await getPostFromPrams(params);

// if (!post || !post.published) {
//   return {
//     title: "Page Not Found",
//     description: "The requested page could not br found."
//   };
// }

// const ogSearchParams = new URLSearchParams();
// ogSearchParams.set("title", post.title)
// return {
//   title: post.title,
//   description: post.description,
//   authors: { name: siteConfig.author },
//   openGraph: {
//     title: post.title,
//     description: post.description,
//     type: "article",
//     url: post.slug,
//     images: [
//       {
//         url: `/api/og?${ogSearchParams.toString()}`,
//         width: 1200,
//         height: 630,
//         alt: post.title
//       }
//     ]
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: post.title,
//     description: post.description,
//     images: [`/api/og?${ogSearchParams.toString()}`],
//   }
// }
// }

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params, }: PostPageProps) {
  const post = await getPostFromPrams(params);

  if (!post || !post.published) {
    notFound();
  }


  const dateTitle = (post.publishedDate >= post.updatedDate ? ("Published on: " + formatDate(post.publishedDate)) : ("Last updated: " + formatDate(post.updatedDate)));
  // const dateTitle = (post.publishedDate === post.updatedDate ? "Published on: " : "Last update: ");

  return (<article className=" container px-4 sm:px-6 md:px-8 py-6 prose dark:prose-invert max-w-[1024px]">
    <h1 className="mb-2">{post.title}</h1>
    <div className="flex gap-2 mb-2">
      {post.tags?.map(tag => <Tag tag={tag} key={tag} />
      )}
    </div>
    {post.description ? (
      <p className=" text-xl m-0 text-muted-foreground">{post.description}</p>
    ) : null}

    <time className="text-wrap my-2 text-sm font-semibold" dateTime={post.updatedDate}>{dateTitle}</time>

    <hr className="mb-4 mt-2" />

    <MDXContent code={post.body} />
  </article>)
}
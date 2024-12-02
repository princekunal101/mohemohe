import { questions } from "#site/content";
import { notFound } from "next/navigation";

import { MDXContent } from "@/components/mdx/mdx-components";
import "@/styles/mdx.css";
import { formatDate } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";

interface QuestionPageProps {
  params: {
    slug: string[];
  };
}

export async function getPostFromPrams(params: QuestionPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const question = questions.find((question) => question.slugAsParams === slug);

  return question;
}

export async function generateMetadata(
  { params, }: QuestionPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const question = await getPostFromPrams(params);

  if (!question || !question.published) {
    return {
      title: "Page Not Found",
      description: "The requested page could not br found."
    };
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", question.title)
  return {
    title: question.title,
    description: question.titleDescription,
    authors: { name: siteConfig.author },
    openGraph: {
      title: question.title,
      description: question.titleDescription,
      type: "article",
      url: question.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 680,
          alt: question.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: question.title,
      description: question.titleDescription,
      images: [`/api/og?${ogSearchParams.toString()}`],
    }

  }
}

export async function generateStaticParams(): Promise<QuestionPageProps["params"][]> {
  return questions.map((question) => ({ slug: question.slugAsParams.split("/") }));
}

export default async function PostPage({ params, }: QuestionPageProps) {
  const question = await getPostFromPrams(params);

  if (!question || !question.published) {
    notFound();
  }

  const githubLink = (siteConfig.links.github + "/tree/master/content/" + (question.gitLinks.split("/").pop() === params.slug[0] ? question.gitLinks + "/index" : question.gitLinks) + ".mdx");

  const dateTitle = (question.publishedDate >= question.updatedDate ? ("Published on: " + formatDate(question.publishedDate)) : ("Last updated: " + formatDate(question.updatedDate)));

  return (<article className=" container px-4 sm:px-6 md:px-8 py-6 prose dark:prose-invert max-w-[1024px]">
    <h1 className="mb-2">{question.title}</h1>

    {/* <time className="text-wrap my-2 text-sm font-semibold" dateTime={question.updatedDate}>{dateTitle}</time> */}

    <hr className="mb-4 mt-2" />

    <MDXContent code={question.body} />
    <div className="flex w-full gap-2 justify-between px-2">
      <a className="flex gap-2 items-center" target="_blank" href={githubLink}>
        <Icons.github className="h-7 w-7" />
        <p className="flex text-wrap my-2 text-sm font-semibold">Help us <span className="hidden sm:flex">&nbsp;to improve content</span></p>
      </a>
      <time className="text-right text-wrap my-2 text-sm font-semibold" dateTime={question.updatedDate}>{dateTitle}</time>
    </div>
  </article>)
}
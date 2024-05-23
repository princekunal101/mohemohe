import { title } from "process";
import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";


const computeFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),

});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/**/*.mdx",
  // pattern: "learn/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(90),
      description: s.string().max(900).optional(),
      publishedDate: s.isodate(),
      updatedDate: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    }).transform(computeFields)
})

const chapters = defineCollection({
  name: "Chapter",
  // pattern: "blog/**/**/*.mdx",
  pattern: `learn/**/**/*.mdx`,// in ${variable books path from getting from learn folder}
  schema: s
    .object({
      slug: s.path(),
      chapTitle: s.string().max(90),
      bookName: s.string().max(90),
      bookColor: s.string().max(50).optional(),
      chapNum: s.number(),
      chapDesc: s.string().max(900).optional(),
      publishedDate: s.isodate(),
      updatedDate: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    }).transform(computeFields)
})



export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { chapters, posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug, 
      remarkMath,
      [rehypeKatex, { strict: true, throwOnError: true }],
      [rehypePrettyCode, { theme: "github-dark" }],
      [
        rehypeAutolinkHeadings, {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          }
        }]],
    remarkPlugins: [],
  }
})

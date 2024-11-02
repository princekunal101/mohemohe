import { title } from "process";
import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import { h } from 'hastscript';
import { toString } from 'hast-util-to-string';
import rehypePrettyCode from "rehype-pretty-code";
import autolinkHeadings from "rehype-autolink-headings";
import remarkMath from "remark-math";
import remarkGFM from 'remark-gfm';
import rehypeKatex from "rehype-katex";
import { Node, Nodes } from "hast";


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
      isBNew: s.boolean().default(false),
      isNew: s.boolean().default(false),
      isMod: s.boolean().default(false),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      body: s.mdx(),
    }).transform(computeFields)
})

const options = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  }
}

const autoLinkOptions = {
  behavior: "wrap",
  // group: (node: Nodes) => h(`div.heading-wrapper.level-${node}`, { tabIndex: -1 },),
  properties: (node: Nodes) => ({ 'className': "subheading-anchor" }),
  content: (heading: Nodes) => ([
    h('span', `${toString(heading)}`),
    h(`span`,
      [h('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
        [h('path', { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
        h('path', { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })],
      )],
    )
  ]),
}

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

      [rehypeKatex, { strict: true, throwOnError: true }],
      [rehypePrettyCode, options],
      [autolinkHeadings, autoLinkOptions]
    ],
    remarkPlugins: [
      remarkMath,
      remarkGFM,
    ],
  }
})

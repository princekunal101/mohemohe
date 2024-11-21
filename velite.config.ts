import { title } from "process";
import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import { h } from 'hastscript';
import { toString } from 'hast-util-to-string';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers';
import autolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from 'rehype-external-links';
import remarkMath from "remark-math";
import remarkGFM from 'remark-gfm';
import rehypeKatex from "rehype-katex";

import { Element, Nodes } from "hast";
import { CodeHeaderIcons, Language } from "./components/code-header-icons";


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
      chapShortDesc: s.string().max(300).optional(),
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
  },
  onVisitTitle(node: Element) {
    const language = node.properties['data-language'] as Language;

    node.children = [h('div', { className: 'code-block-header' }, [
      h('div', { className: 'header-block-caption' }, [
        h('span', { className: 'code-block-language-icon' },
          CodeHeaderIcons[language] || CodeHeaderIcons['default'],
        ),
        h('span', { className: 'code-block-caption-name' }, `${toString(node)}`)
      ]),
      h('div.code-block-copy-button', [
        h('button.copy-button', { type: 'button' },
          h('svg', { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
            h('rect', { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
            h('path', { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }),

          ))
      ])

    ])]

    // )
  },
  // transformers: [
  //   transformerCopyButton({
  //     visibility: 'always',
  //     feedbackDuration: 3000,
  //   })
  // ]

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

// external links icon and options
const externalLinksOptions = {
  properties: ({ 'className': "links" }),

  rel: (node: Element) => {
    const url = node.properties.href;
    return url?.toString().startsWith('http://') || url?.toString().startsWith('https://') ? ['nofollow', 'noopener', 'noreferrer'] : node.properties.className = (node.properties.className || []).toString().concat('internal-links');
  },
  target: (node: Element) => {
    const url = node.properties.href;
    return url?.toString().startsWith('http://') || url?.toString().startsWith('https://') ? '_blank' : undefined;
  },
  test: (node: Element) => {
    const url = node.properties.href;
    if (url?.toString().startsWith('http') || url?.toString().startsWith('https')) {
      // node.properties.className = (node.properties.className || []).toString().concat('internal-links');
      return true;
    }
    else if (url?.toString().startsWith('/') || url?.toString().startsWith('mailto') || url?.toString().startsWith('#')) {
      node.properties.className = (node.properties.className || []).toString().concat('internal-links');
      return false;
    }
  },
  protocols: ['http', 'https', 'tel', 'data', 'mailto', '//'],
  content: (node: Element) => {
    const url = node.properties.href;
    if (url?.toString().startsWith('http://') || url?.toString().startsWith('https://')) {
      return [
        // h('span', [
        h('svg', {
          width: "24px",
          height: "24px",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }, [
          h('path', { d: "M7 7h10v10" }),
          h('path', { d: "M7 17 17 7" }),
        ])
        // ])
      ]
    }
  },
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
      [rehypeExternalLinks, externalLinksOptions],
      [autolinkHeadings, autoLinkOptions],
    ],

    remarkPlugins: [
      remarkMath,
      remarkGFM,
    ],
  }
})

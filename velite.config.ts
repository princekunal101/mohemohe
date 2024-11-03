import { title } from "process";
import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import { h } from 'hastscript';
import { toString } from 'hast-util-to-string';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers'
import autolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from 'rehype-external-links';
import remarkMath from "remark-math";
import remarkGFM from 'remark-gfm';
import rehypeKatex from "rehype-katex";

import { Element, ElementContent, Nodes } from "hast";
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
    else if (url?.toString().startsWith('/') || url?.toString().startsWith('mailto')) {
      node.properties.className = (node.properties.className || []).toString().concat('internal-links');
      return false;
    }
  },
  protocols: ['http', 'https', 'tel', 'data', 'mailto', '//'],
  content: (node: Element) => {
    const url = node.properties.href;
    if (url?.toString().startsWith('http://') || url?.toString().startsWith('https://')) {
      return [
        h('span', [
          h('svg', {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
          }, [
            h('path', { d: "M15 3h6v6" }),
            h('path', { d: "M10 14 21 3" }),
            h('path', { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" })
          ])
        ])
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
      [rehypePrettyCode, {
        theme: {
          dark: "github-dark",
          light: "github-light",
        },
        onVisitTitle(node: Element) {
          const language = node.properties['data-language'] as Language;
          // if(codeNode.tagName === 'code'){
          // node.properties.className = ['its-working-here'];
          // node.children. = ['its-working-here'];
          // node.children = node.children.filter(child => child.type !== 'text');
          //   node.children = node.children.map(child => {if( child.type === 'text'){

          //     return h('span', { className: 'title' }, `${toString(node)}`)
          //   }
          // return child})
          node.children = [h('div', { className: 'code-block-header' }, [
            h('div', { className: 'header-block-caption' }, [
              h('span', { className: 'code-block-language-icon' },
                CodeHeaderIcons[language] || CodeHeaderIcons['default'],
                // h('svg', { width: "24px", height: "24px", fill: "currentColor", viewBox: "0 0 512 512", enableBackground: "new 0 0 512 512" },
                //   h('g', { strokeLinecap: "round", strokeLinejoin: "round" }, [
                //     h('path', { d: "M108.669,0.501h23.032v22.756h21.069V0.501h23.034V69.41h-23.032V46.334h-21.069V69.41h-23.032V0.501 H108.669z M206.091,23.353h-20.275V0.501h63.594v22.852h-20.285V69.41h-23.032V23.353H206.091z M259.502,0.501h24.02l14.771,24.213 l14.759-24.213h24.023V69.41h-22.938V35.256l-15.845,24.5h-0.395l-15.856-24.5V69.41h-22.539V0.501z M348.54,0.501h23.038v46.133 h32.391V69.41H348.54V0.501z M74.987,100.926l32.946,369.533l147.844,41.04L404.031,470.4l32.981-369.475H74.987z M368.289,188.62 l-2.063,22.977l-0.906,10.188h-0.149H256h-0.158h-63.956l4.142,46.407h59.814H256h92.98h12.214l-1.106,12.172l-10.65,119.32 l-0.682,7.652L256,433.045v0.008l-0.208,0.059l-92.839-25.774l-6.351-71.161h20.97h24.527l3.227,36.146l50.474,13.632l0.042-0.013 v-0.004l50.551-13.64l5.257-58.781H256h-0.158H154.578L143.439,188.62l-1.085-12.157h113.488H256h113.374L368.289,188.62z" })
                //   ]
                //   )
                // ),
              ),
              h('span', { className: 'code-block-caption-name' }, `${toString(node)}`)
            ]),
            h('div.code-block-copy-button', [
              h('button.copy-button', { type: 'button' ,onClick: 'copyCode(this)'},
                h('svg', { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                  h('rect', { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }),
                  h('path', { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }),

                ))
            ])

          ])]

          // )
        }
        // transformers: [
        //   transformerCopyButton({
        //     visibility: 'always',
        //     feedbackDuration: 3000,
        //   })
        // ]
      }
      ],
      // [rehypeCodeTitles, {
      //   customTitle: (title: Element) => {
      //     return h('span', { className: 'code-title' },
      //       [h('span', { className: 'icon' }, '🗒️'),
      //         `${title}`
      //       ]
      //     )
      //   }
      // }],
      [rehypeExternalLinks, externalLinksOptions],
      [autolinkHeadings, autoLinkOptions]
    ],

    remarkPlugins: [
      remarkMath,
      remarkGFM,
    ],
  }
})


// function copyCode(button: Element) {
//   const code = button.closest('pre').querySelector('code').innerText;
//   navigator.clipboard.writeText(code).then(() => {
//     button.innerText = 'Copied!';
//     setTimeout(() => {
//       button.innerText = 'copy';
//     }, 3000);
//   });
// }
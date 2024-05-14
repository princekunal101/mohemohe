
import { Post, Chapter } from "#site/content";
import { type ClassValue, clsx } from "clsx"
import { slug } from "github-slugger";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// // Sorting only on the basis of publishing date
// export function sortChapPosts(chapters: Array<Chapter>) {
//   return chapters.sort((a, b) => {
//     if (a.publishedDate > b.publishedDate) return -1;
//     if (a.publishedDate < b.publishedDate) return 1;
//     return 0;

//   })
// }

// // Sorting only on the basis of publishing date
// export function sortPubPosts(posts: Array<Post>) {
//   return posts.sort((a, b) => {
//     if (a.publishedDate > b.publishedDate) return -1;
//     if (a.publishedDate < b.publishedDate) return 1;
//     return 0;

//   })
// }

// // sorting with chapter numbers
// export function sortByChapters(chapters: Array<Chapter>){
//   return chapters.sort((a,b)=>{
//     if (a.chapNum < b.chapNum) return -1;
//     if (a.chapNum > b.chapNum) return 1;
//     return 0;
//   })
// }

// sorting with chapter numbers
export function sortByChapters(chapters: Array<Chapter>) {
  return chapters.sort((a, b) => (a.chapNum < b.chapNum ? -1 : 1))
}

// Sorting by chance if updated date have less than published date
export function sortPosts(posts: Array<Post>) {

  return posts.sort((a, b) => {
    let pubA = a.publishedDate;
    const updA = a.updatedDate;
    let pubB = b.publishedDate;
    const updB = b.updatedDate;
    (pubA < updA ? pubA = updA : null);
    (pubB < updB ? pubB = updB : null);
    
    if (pubA > pubB) return -1;
    if (pubA < pubB) return 1;
    return 0;
  })
}

// Sorting by updated dates only
export function sortByUpdatedPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.updatedDate > b.updatedDate) return -1;
    if (a.updatedDate < b.updatedDate) return 1;
    return 0;
  })
}


export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    })
  })
  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}


export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter(post => {
    if (!post.tags) return false
    const slugifiedTags = post.tags.map(tag => slug(tag))
    return slugifiedTags.includes(tag)
  })
}
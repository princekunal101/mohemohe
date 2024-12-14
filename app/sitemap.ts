import { chapters, posts } from "@/.velite";
import { getAllIndexedChapters, sortPosts } from "@/lib/utils";
import { MetadataRoute } from "next";

const WEBSITE_HOST_URL = process.env.SITE_URL || 'https://www.mohemohe.in'

type changeFrequency =
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sortedPosts = sortPosts(posts.filter((post) => post.published)); //published posts
    const changeFrequencyPosts = 'monthly' as changeFrequency

    const posted = sortedPosts.map(({ slug, updatedDate }) => ({
        url: `${WEBSITE_HOST_URL}/${slug}`,
        lastModified: updatedDate,
        changeFrequencyPosts,
        priority: 0.7,
    }));


    const indexChapter = getAllIndexedChapters(chapters.filter((chapter) => chapter.published));
    const changeFrequencyChapters = 'weekly' as changeFrequency
 
    const chap = indexChapter.map(({ slug, updatedDate }) => ({
        url: `${WEBSITE_HOST_URL}/${slug}`,
        lastModified: updatedDate,
        changeFrequencyChapters,
        priority: 0.85,
    }));



    // const routes = ['', '/about', '/learn', '/blog'].map((route) => ({
    //     url: `${WEBSITE_HOST_URL}${route}`,
    //     lastModified: new Date().toISOString(),
    //     changeFrequency,
    //     priority: 1,
    // }))

    return [
        
        {
            url: `${WEBSITE_HOST_URL}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
          },
          {
            url: `${WEBSITE_HOST_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.95,
          },
          {
            url: `${WEBSITE_HOST_URL}/learn`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
          },
          
          {
            url: `${WEBSITE_HOST_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
          },
          
           ...posted, ...chap]
}
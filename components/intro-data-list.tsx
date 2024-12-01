import Link from "next/link";

interface ListData{
    title: string;
    slug: string;
    desc: string;
}

export const items: ListData[]=[
{title: "Web Technology", slug:"/learn/web-technology", desc:"Understanding the backbone of the internet, enabling efficient design and devlopment of websites and web applications."},
{title: "Gate Syllabus 2025", slug:"/blog/syllabus-gate-cs", desc:"Explore the Gate CSE syllabus to understand the topics and weightage for each subject, helping you to prepare effectivly for the exam."},
{title: "Java Lab file", slug:"/blog/oops-java-lab", desc:"It provides you practical skills to build robust and effiecient applications and data structure and it's algorithm."},
];

interface IntroDataListProps{
    title: string;
    slug: string;
    desc: string;
}
export default function IntroDataList({title, slug, desc}:IntroDataListProps){
    return(
        <Link href={slug} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
        
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </Link>
    )
}
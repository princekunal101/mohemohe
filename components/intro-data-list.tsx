import Link from "next/link";
import { Icons } from "./icons";
import BookItemCover from "./intro-list-image";
import { Children, ReactNode } from "react";

interface ListData {

    title: string;
    slug: string;
    desc: string;
}

export const items: ListData[] = [
    { title: "Web Technology", slug: "/learn/web-technology", desc: "Understanding the backbone of the internet, enabling efficient design and devlopment of websites and web applications." },
    { title: "Gate Syllabus 2025", slug: "/blog/syllabus-gate-cs", desc: "Explore the Gate CSE syllabus to understand the topics and weightage for each subject, helping you to prepare effectivly for the exam." },
    { title: "Java Lab file", slug: "/blog/oops-java-lab", desc: "It provides you practical skills to build robust and effiecient applications and data structure and it's algorithm." },
];

interface IntroDataListProps {
    children?: ReactNode,
    title: string;
    slug: string;
    desc: string;
}
export default function IntroDataList({ title, slug, desc, children, ...props }: IntroDataListProps) {
    return (
        <Link href={slug} className="border bg-background rounded-xl p-4 flex flex-col w-full group hover:border-secondary-foreground">
            {children}
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">{desc}</p>
        </Link>
    )
}

export function QuizQuesDataList() {
    return (
        <Link href={'/questions'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
            <div className="h-64 bg-secondary/50 flex justify-center rounded-t-md mb-4">
                <div className="py-2 text-gray-500/90">
                    <Icons.questionScetchIII className="h-full w-full" />
                </div>
            </div>
            <h2 className="text-xl font-semibold">Quick Quiz</h2>
            <p className="text-sm text-muted-foreground">Quick quizzes help in rapidly assessing knowlwdge and pinpointed wear areas for improvement.</p>
        </Link>
    )
}

export function BookChaptersDataList() {
    return (

        <Link href={'/learn'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
            <div className="flex justify-center items-center h-64 bg-secondary/50 rounded-t-md mb-4">
                <BookItemCover />
            </div>
            <h2 className="text-xl font-semibold">Chapter wise content</h2>
            <p className="text-sm text-muted-foreground">It breaks down complex topics into manageble sections, making it easier for you to digest and retain information.</p>
        </Link>

    )
}
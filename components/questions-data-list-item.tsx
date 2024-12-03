import Link from "next/link";

interface QuizQuestionsDataListProps {
    title: string;
    slug: string;
    topic: number;
    questions: number;
    isNew: boolean;
}
export function QuizQuestionsDataList({ title, slug, topic, questions, isNew }: QuizQuestionsDataListProps) {
    return (
        <Link href={slug} className="border bg-background rounded-md p-4 gap-2 flex flex-col w-full group hover:border-secondary-foreground">
            <div className="w-full flex justify-between">
                <h2 className="text-xl font-semibold">{title}</h2>
                {isNew && <span className="text-[0.8rem]">NEW</span>}
            </div>
            <p className="text-sm text-muted-foreground">Questions: {questions} Topic: {topic}</p>
        </Link>
    )
}


interface QuestionsDataListProps {
    title: string;
    slug: string;
    desc: string;
    isNew: boolean;
}

export default function QuestionsDataList({ title, slug, desc, isNew }: QuestionsDataListProps) {
    return (
        <Link href={slug} className="border bg-background rounded-md p-4 gap-2 flex flex-col w-full group hover:border-secondary-foreground">
            <div className="w-full flex justify-between">
                <h2 className="text-xl font-semibold">{title}</h2>
                {isNew && <span className="text-[0.8rem]">NEW</span>}
            </div>  <p className="text-sm text-muted-foreground">{desc}</p>
        </Link>
    )
}
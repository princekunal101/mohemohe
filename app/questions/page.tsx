import { questions } from "@/.velite";
import QuestionsDataList, { QuizQuestionsDataList } from "@/components/questions-data-list-item";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "The Question Section",
    description: "Choose a corner for testing yourself for success.",

}

export default function QuestionPage() {
    return (
        <div className="relative flex flex-col  py-12 md:pt-32 ">
            <section className="space-y-6">
                <div className="container px-4 sm:px-6 md:px-8  flex flex-col gap-4 text-center">
                    <h1 className=" px-4 text-3xl md:text-5xl lg:text-6xl mb-4 font-semibold text-balance">
                        Practice Questions
                    </h1>
                    <p className="max-w-[42rem] w-[90%] mx-auto mb-10 md:mb-16 text-muted-foreground sm:text-base text-balance">
                        Welcome to Question Page! This section os designed to test your knowledge and understanding with a variety of questions across different subjects.
                    </p>
                </div>
            </section>

            <section className="w-full space-y-6 my-3 py-3 max-w-6xl dark:bg-zinc-700 bg-zinc-200 mx-auto">
                <div className="w-full border-b border-b-secondary-foreground/20">
                    <p className="text-center text-2xl mb-3 font-semibold">Quick Quiz</p>
                </div>
                <div className="container grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3">
                    {questions.map((ques, index) => (ques.isQuiz && <QuizQuestionsDataList key={index} slug={ques.slug} title={ques.title} topic={0} questions={0} isNew={ques.isNew} />))}
                </div>
            </section>

            <section className="w-full space-y-6 my-3 py-3 max-w-6xl dark:bg-zinc-700 bg-zinc-200 mx-auto">
                <div className="w-full border-b border-b-secondary-foreground/20">
                    <p className="text-center text-2xl mb-3 font-semibold">Questions</p>
                </div>
                <div className="container grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3">
                    {questions.map((ques, index) => (!ques.isQuiz && <QuestionsDataList key={index} slug={ques.slug} title={ques.title} desc={ques.titleDescription} isNew={ques.isNew} />))}

                </div>
            </section>
        </div>
    )
}
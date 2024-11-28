import { Metadata } from "next"

export const metadata: Metadata = {
    title: "The Question Section ",
    description: "Choose a corner for testing yourself for success.",

}

export default function QuestionPage() {
    return (
        <div className="relative flex flex-col  py-12 md:pt-32 ">
            <section className="space-y-6">
                <div className="container px-4 sm:px-6 md:px-8  flex flex-col gap-4 text-center">
                    <h1 className=" px-4 text-4xl md:text-6xl lg:text-7xl mb-4 font-semibold text-balance">
                        Questions (*upcoming)!
                    </h1>
                    <p className="max-w-[42rem] w-[90%] mx-auto mb-10 md:mb-16 text-muted-foreground sm:text-lg text -balance">
                        Welcome to Question Page! This section os designed to test your knowledge and understanding with a variety of questions across different subjects.
                    </p>
                </div>

            </section>
        </div>
    )
}
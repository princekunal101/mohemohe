import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "@/styles/intro.css";
import { Icons } from "@/components/icons";
import BookItemCover from "@/components/intro-list-image";
import IntroDataList, { items } from "@/components/intro-data-list";
import Image from "next/image";

export const metadata: Metadata = {
  title: siteConfig.name + " | " + "The Best Learning Platform",
  // description: "Choose a book for a day and Add a step for success. A step for the success"
}

export default function Home() {
  const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(0, 5);
  return (
    <>
      <section className="intro_root_container">
        <div className="intro_main_container">
          <h1 className="intro_heading intro_title">
            The Learning Platfrom <span className="_break_title"></span> for the Future
          </h1>
          <div className="relative w-full intro_subtitle_container">

            <p className="intro_desc intro_heading_desc">
              Trusted by the students, MoheMohe enables you to achieve excellence with <strong>high-quality, interactive</strong> learning tools.
            </p>
          </div>
          <div className="flex justify-center w-full intro_button_part_container">
            <div className="intro_button_container">
              <div className="flex flex-row justify-center gap-4">
                <Link href="/learn" className={cn(buttonVariants({ size: "lg" }), "h-12 px-5 text-base w-fit")}>
                  Start Learning
                </Link>
                <Link href="/questions" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-5 text-base w-fit")}>
                  Questions
                </Link>
              </div>
              <p className="text-[0.8rem] text-muted-foreground">remeber you are the future of the nation</p>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-6 max-w-6xl m-auto mb-14">
        <div className="flex lg:flex-row flex-col justify-center items-center gap-2 text-center container">
          <h2 className="font-bold text-2xl intro_heading">
            What&apos;s in MoheMohe?
          </h2>
          <p data-main-paragraph="true" className="intro_desc">
            Everything you need to achive excellence in learning
          </p>
        </div>

        <div className="w-full container mt-12">
          <div className=" w-full hidden sm:grid grid-cols-2 lg:hidden gap-4 ">
            <div className="w-full flex flex-col gap-4">
              <Link href={'/questions'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
                <div className="h-64 bg-secondary/50 flex justify-center rounded-t-md mb-4">
                  <div className="py-2 text-gray-500/90">
                    <Icons.questionScetchIII className="h-full w-full" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold">Quick Quiz</h2>
                <p className="text-sm text-muted-foreground">Quick quizzes help in rapidly assessing knowlwdge and pinpointed wear areas for improvement. (*upcoming)</p>
              </Link>

              <Link href={'/questions'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
                <div className="h-64 bg-secondary/50 flex justify-center rounded-t-md mb-4">
                  <div className="py-2 text-gray-500/90">
                    <Icons.questionScetchIII className="h-full w-full" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold">Questions</h2>
                <p className="text-sm text-muted-foreground">Practice questions are a valuable tool for reinforcing knowledge and increase your confidence. (*upcoming)</p>
              </Link>
            </div>

            <div className="w-full flex flex-col gap-4">
              <Link href={'/learn'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
                <div className="flex justify-center items-center h-64 bg-secondary/50 rounded-t-md mb-4">
                  <BookItemCover />
                </div>
                <h2 className="text-xl font-semibold">Chapter wise content</h2>
                <p className="text-sm text-muted-foreground">It breaks down complex topics into manageble sections, making it easier for you to digest and retain information.</p>
              </Link>
              {items.map((data, index) => <IntroDataList key={index} title={data.title} desc={data.desc} slug={data.slug} />)}

            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:hidden lg:grid lg:grid-cols-3 gap-4">

            {/* column 3-1 */}
            <Link href={'/questions'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
              <div className="h-64 bg-secondary/50 flex justify-center rounded-t-md mb-4">
                <div className="py-2 text-gray-500/90">
                  <Icons.questionScetchIII className="h-full w-full" />
                </div>
              </div>
              <h2 className="text-xl font-semibold">Quick Quiz</h2>
              <p className="text-sm text-muted-foreground">Quick quizzes help in rapidly assessing knowlwdge and pinpointed wear areas for improvement. (*upcoming)</p>
            </Link>

            <Link href={'/learn'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
              <div className="flex justify-center items-center h-64 bg-secondary/50 rounded-t-md mb-4">
                <BookItemCover />
              </div>
              <h2 className="text-xl font-semibold">Chapter wise content</h2>
              <p className="text-sm text-muted-foreground">It breaks down complex topics into manageble sections, making it easier for you to digest and retain information.</p>
            </Link>

            <Link href={'/questions'} className="border rounded-xl p-4 flex flex-col w-full shadow group hover:border-secondary-foreground">
              <div className="h-64 bg-secondary/50 flex justify-center rounded-t-md mb-4">
                <div className="py-2 text-gray-500/90">
                  <Icons.questionScetchIII className="h-full w-full" />
                  {/* <Image className="h-full w-full" height={500} width={500} src={"/images/questions-images.png"} alt="Questions"/> */}
                </div>
              </div>
              <h2 className="text-xl font-semibold">Questions</h2>
              <p className="text-sm text-muted-foreground">Practice questions are a valuable tool for reinforcing knowledge and increase your confidence.  (*upcoming)</p>
            </Link>

            {items.map((data, index) => <IntroDataList key={index} title={data.title} desc={data.desc} slug={data.slug} />)}

          </div>
        </div>
      </section>
    </>
  );
}



export default function BookItemCover() {
    return (
        <div className="relative w-60 h-44 py-1 px-2 bg-zinc-50 dark:bg-zinc-600 border shadow-lg transform rotate-12">
            <div className="relative h-full border bg-white dark:bg-zinc-700 dark:border-zinc-500 border-zinc-100" />

            <div className="absolute flex inset-0 bg-white dark:bg-zinc-600 border rounded-[2px] p-1 shadow-lg transform -rotate-12">
                <div className="flex w-full h-full  mx-1 shadow ">

                    <div className="flex justify-center items-center w-full h-full bg-gradient-to-l dark:from-zinc-500 from-zinc-300 to-40% dark:to-zinc-700 to-white">
                        <div className="w-14 h-14 flex justify-center items-center bg-blue-500/20 rounded-full text-primary-foreground text-2xl">1</div>
                    </div>
                    <div className="flex justify-center items-center w-full bg-gradient-to-r dark:from-zinc-600 from-zinc-200 to-40% dark:to-zinc-700 to-white ">
                        <div className=" flex flex-col justify-center items-center text-blue-500/30">
                            <p className="text-xl">Chapter</p>
                            <p className="text-[0.7rem]">Learn chapter 1</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
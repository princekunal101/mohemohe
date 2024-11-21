import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import React, { ReactNode } from "react";

interface ChapIntroProps {
  children?: ReactNode;
  txCenter?: boolean;
  listData?: Array<{ icon: React.ReactNode; topic: string }>;
}

export function ChapIntro({
  children,
  txCenter = false,
  listData,
  ...props
}: ChapIntroProps) {
  return (<div className="not-prose my-2 md:-mx-10 md:p-10 md:my-4 md:rounded-md md:bg-gray-100 md:dark:bg-gray-800 ">
    <h3 className="text-xl md:text-2xl  font-semibold">In this chapter...</h3>
    <p className="mb-2 text-sm">Here are the topics we&apos;ll cover</p>
    <div className={`rounded-md border border-inherit bg-background shadow-md px-4 py-2 dark:max-w-none ${txCenter ? "text-center" : null}`}
      {...props}>
      {listData?.map((item, index) => (
        <div key={index} className="flex gap-3 px-4 py-3 border-b last-of-type:border-0">
          <div className="flex-shrink-0 mt-0.5 md:mt-1">{item.icon}</div> 
          <p className=" text-sm sm:text-base">{item.topic}</p>
        </div>
      ))
      }
      {/* // <div className="flex gap-3 p-3  border-b last-of-type:border-0">
      //  <div className="flex-shrink-0 mt-0.5 md:mt-1"><InfoIcon className="w-4 h-4"/></div> <p className="text-sm md:text-base">Learn about the docuent and forms. Lorem ipsum dolor sit amet consectetur adipisicing elit. At, autem obcaecati voluptatum placeat, aperiam nam doloribus nesciunt accusamus laboriosam id ut perspiciatis officiis veritatis doloremque enim ad quibusdam mollitia illo!</p>
      // </div> */}


      {children}</div>
  </div>)
}

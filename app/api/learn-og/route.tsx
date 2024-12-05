import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";


export const runtime = "edge";

const interBold = fetch(new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer());
export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold;

    const { searchParams, } = req.nextUrl;
    const title = searchParams.get("title");
    // const description = searchParams.get("description")|| 'Default description';
    const bookName = searchParams.get("book") || 'Deafult';
    const chapterNum = searchParams.get("chapter") || 'D';

    if (!title) {
      return new Response("No title provided!", { status: 500 });
    }
    // if (!description) {
    //   return new Response("No description provided!", { status: 500 });
    // }


    const heading =
      title.length > 50 ? `${title.substring(0, 50)}...` : title;
    // const desc =
    //   description.length > 500 ? `${description?.substring(0, 500)}...` : description;

    return new ImageResponse((

      <div style={{ backgroundImage: "url(https://mohemohe.in/images/learn-og-bg.png)" }} tw="flex flex-col w-full h-full items-center bg-white justify-center">
        <div tw="flex flex-row-reverse w-full justify-center items-center">

          <div tw="flex flex-col ml-10 w-auto h-full justify-start items-start">
            <div style={{ transform: 'rotate(-10deg)' }} tw="flex text-2xl -ml-6 text-zinc-500 font-semibold">Chapter {chapterNum}</div>
            <div style={{ transform: 'rotate(-10deg)' }} tw="flex mr-28 w-80 text-7xl tracking-tight font-bold">{heading}</div>
          </div>

          <div style={{ transform: 'rotate(-10deg)' }} tw="flex justify-center items-center -ml-6 w-38 h-38 rounded-full text-7xl font-extrabold text-blue-500 bg-blue-500/20">{chapterNum}</div>

          {/* books */}
          <div style={{ transform: 'rotate(-10deg)' }} tw="flex relative w-[260px] h-[360px] ">
            
            <div tw="flex w-[256px] relative h-[341px] bg-green-900 overflow-hidden shadow-2xl shadow-green-800/85 rounded-md">
              <div tw="flex w-full shadow-inner">
                <div tw="flex flex-col absolute w-full flex-1 p-5 text-zinc-100 justify-center text-center">
                  <p tw="flex w-full mb-2 text-2xl font-bold opacity-95">{bookName}</p>
                  <p tw="flex text-[1rem] font-thin opacity-95">Learn Beginner level to Professional level of {bookName}.</p>
                </div>
                <div style={{backgroundImage: 'linear-gradient(to right, rgba(0,0,0, 0.25) 30%, rgba(255,255,255, 0.75) 55%, rgba(255,255,255, 0.45) 80%)'}} tw="flex h-full w-3" />
                <div style={{backgroundImage: 'linear-gradient(to right, rgba(255,255,255, 0.45) 30%, rgba(0,0,0,0.15))'}} tw="flex h-full w-2" />
                <div style={{backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.15) 10%, rgba(255,255,255,0.40), rgba(255,255,255, 0.10) 95%)'}} tw="flex h-full w-3" />
                <div style={{backgroundImage: 'linear-gradient(to right, rgba(255,255,255, 0.10) , transparent)'}} tw="flex h-full w-5" />
                <div tw="flex text-zinc-100 absolute w-full justify-center bottom-3">
                  <Icons.logo tw="flex w-34 h-34" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>



    ), {
      width: 1200,
      height: 630,
      fonts: [{
        name: "Inter",
        data: fontBold,
        style: "normal",
        weight: 700,
      },
      ],
    });
  }
  catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
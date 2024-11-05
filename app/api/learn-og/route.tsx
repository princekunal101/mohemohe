import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

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

      <div tw="flex flex-col w-full h-full items-center justify-center">
        <div style={{ filter: 'blur(90px)' }} tw="absolute bg-red-400 h-80 w-50  left-0 top-40 rounded-full" />
        <div style={{ filter: 'blur(50px)' }} tw="absolute bg-pink-500 h-24 w-24 left-0 top-5 rounded-full" />
        <div style={{ filter: 'blur(70px)' }} tw="absolute bg-blue-400 h-80 w-80 top-0 right-0 rounded-full" />
        <div style={{ filter: 'blur(50px)' }} tw="absolute bg-green-500/30 h-64 w-64  -right-10 -bottom-10 rounded-full" />
        <div tw="flex flex-row-reverse w-full justify-center items-center">

          <div tw="flex flex-col ml-10 w-auto h-full justify-start items-start">
            <div style={{ transform: 'rotate(-12deg)' }} tw="flex text-2xl -ml-6 text-zinc-500 font-semibold">Chapter {chapterNum}</div>
            <div style={{ transform: 'rotate(-12deg)' }} tw="flex w-70 text-6xl font-extrabold">{heading}</div>
          </div>

          <div style={{ transform: 'rotate(-12deg)' }} tw="flex justify-center items-center -ml-4 w-32 h-32 rounded-full text-6xl font-extrabold text-blue-500 bg-blue-500/20">{chapterNum}</div>

          {/* books */}
          <div style={{ transform: 'rotate(-12deg)' }} tw="flex relative w-[260px] h-[360px] ">
            <div style={{ background: 'linear-gradient(to bottom, #f43f5e, #e11d48)' }} tw="w-full h-full mb-3 flex flex-col items-center justify-between rounded-md shadow-2xl text-white">
              <p tw="text-4xl mt-6 mx-4 font-semibold">{bookName}</p>
              <div tw=" flex opacity-70 items-center bg-black justify-center rounded-full mb-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlSpace="preserve"
                  width={110}
                  height={110}
                  viewBox="0 0 180.622 180.622"
                >
                  <path
                    d="m54.365 48.572-12.386 69.616h7.884c7.774 0 12.463-4.77 13.676-11.59l6.966-39.15 12.674 36.025 27.284-34.931-8.833 49.646h7.884c7.774 0 12.463-4.77 13.677-11.59l12.498-70.247H118.64c-7.19 0-10.554 4.804-10.554 4.804L88.967 67.57l-9.086-31.219H67.324c-4.806.018-11.131 3.737-12.96 12.22Z"
                    style={{

                      opacity: 0.974757,
                      fill: "#fff",
                      strokeWidth: 2.02956,
                      strokeLinecap: "round",
                      strokeDashoffset: 453.543,
                      paintOrder: "stroke fill markers",
                    }}
                    transform="translate(-2.714 9.81) scale(1.06238)"
                  />
                </svg>
              </div>
              <div tw="absolute flex w-[260px] h-[360px] rounded shadow-inner overflow-hidden">
                <img tw="h-full w-full flex" src="https://mohemohe.in/forgud_cov.png" alt="cover" />
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
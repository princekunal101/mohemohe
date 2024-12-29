import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { SiteHeader } from "@/components/main-header/site-header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { SiteFooter } from "@/components/main-footer/site-footer";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

// const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-mr" });
export const metadata: Metadata = {
  title: {

    template: `%s - ` + siteConfig.title,
    default: siteConfig.name + ` - ` + siteConfig.title
  },
  description: siteConfig.description,
  keywords: [siteConfig.keywords].join(),
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefer-color-sheme: light)", color: "white" },
    { media: "(prefer-color-sheme: dark)", color: "black" },

  ]
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-pt-[3.5rem]">
      <body className={`in-h-screen bg-background font-sans antialiased overscroll-none ${inter.variable}`}>

        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">

            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />

          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html >
  );
}

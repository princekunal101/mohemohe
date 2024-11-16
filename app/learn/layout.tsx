import { SiteHeader } from "@/components/site-header";
import { ReactNode } from "react"


export default function RouteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* <SiteHeader isStickyHeader={true}/> */}
            {children}
        </>
    );
}
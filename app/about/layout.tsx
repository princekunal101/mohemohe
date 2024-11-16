import { SiteHeader } from "@/components/site-header";
import { ReactNode } from "react"


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <SiteHeader isStickyHeader={true} />
        <main> {children}</main>
    </>
    );
}
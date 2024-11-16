import { SiteHeader } from "@/components/site-header";


export default function DynamicRouteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SiteHeader isStickyHeader={false} />
            <main className="flex-1 overflow-hidden"> {children}</main>
        </>
    );
}
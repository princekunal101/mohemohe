import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

export default function ScrollToTopBottom() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <Button variant={'ghost'} size={'icon'} onClick={scrollToTop} className="rounded-full hover:bg-secondary-foreground/5">
            <ArrowUp className="w-5 h-5" />
        </Button>
    )
}

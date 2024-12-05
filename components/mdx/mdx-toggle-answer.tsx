"use client";
import { Eye, EyeIcon, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";


interface ToggleComponentProps {
    children: React.ReactNode;
}

export default function ToggleComponent({children}:ToggleComponentProps) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => { setIsVisible(!isVisible) }

    return (
        <>
            <div className="w-full flex bg-secondary/60 rounded-lg px-4 flex-col">
                <Button onClick={toggleVisibility} size={'sm'} variant={'default'} className="h-12 w-min px-6 my-4"> {isVisible ? <><EyeIcon className="w-4 h-4 mr-2"/> Hide Answer </>: <><EyeOff className="w-4 h-4 mr-2"/> Show Answer</>}</Button>
                {isVisible && <div className="w-full">
                    {children}
                    </div>}
            </div>
        </>
    )
}
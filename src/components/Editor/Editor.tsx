"use client";

import { useMemo, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import RowsContainer from "./RowsContainer"

export default function Editor() {
    const [value, setValue] = useState('function Example() {\n  return "Hello World!";\n }');
    const [scrollTop, setScrollTop] = useState(0);

    const lineCount = useMemo(() => {
        return Math.max(1, value.split("\n").length);
    }, [value]);

    return (
        <div className="flex w-200 h-100">
            <RowsContainer lineCount={lineCount} scrollTop={scrollTop} />
            <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
                wrap="off"
                className="h-full flex-1 rounded-none border-l-0 focus:ring-0 focus:border-input focus-visible:ring-0 focus-visible:border-input dark:bg-[#0e0e0e]"
                spellCheck="false"
            />
        </div>
    )
}


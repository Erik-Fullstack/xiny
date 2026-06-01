"use client";

import { useState } from "react"
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Variables from "./Variables";
import { useVariablesStore } from "@/stores/variablesStore";
import { runCode } from "@/lib/utils";

export default function Editor() {
    const [value, setValue] = useState('function Example() {\n  return str;\n\ }\n\nreturn Example()');

    return (
        <div className="flex flex-col gap-4 w-200">
            <button
                onClick={() => runCode(value, useVariablesStore.getState().variables)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded w-fit self-end font-semibold"
            >
                Run Code
            </button>
            <Variables />
            <div className="flex h-125 border border-input rounded-md overflow-hidden dark:focus-within:border-primary">
                <CodeMirror
                    value={value}
                    theme="dark"
                    height="100%"
                    extensions={[javascript({ jsx: true })]}
                    onChange={(val) => setValue(val)}
                    className="w-full text-base"
                />
            </div>
        </div>
    )
}


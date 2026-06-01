"use client";

import { useState } from "react"
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import Variables from "./Variables";
import { useVariablesStore } from "@/stores/variablesStore";
import { runCode } from "@/lib/utils";
import { useTheme } from "next-themes";
import MainWindow from "./MainWindow";
import ConsoleWindow from "./ConsoleWindow";

export default function Editor() {
    const [value, setValue] = useState('function Example() {\n  return str;\n\ }\n\nreturn Example()');
    const [consoleValue, setConsoleValue] = useState('');
    const { theme } = useTheme();
    const editorTheme = theme == "light" ? "light" : "dark"

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] w-full">
            <div />
            <div className="flex flex-col gap-4 w-200">
                <button
                    onClick={() => {
                        setConsoleValue('');
                        runCode(value, useVariablesStore.getState().variables, (msg) => setConsoleValue(prev => prev + msg + '\n'))
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 w-fit self-end font-semibold"
                >
                    Run Code
                </button>
                <Variables />
                <MainWindow
                    value={value}
                    height="100%"
                    theme={editorTheme}
                    handleChange={(val) => setValue(val)}
                />
            </div>
            <div className="flex items-end pl-4">
                <ConsoleWindow
                    value={consoleValue}
                    height="100%"
                    theme={editorTheme}
                />
            </div>
        </div>
    )
}


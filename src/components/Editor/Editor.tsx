"use client";

import { useState } from "react"
import Variables from "./Variables";
import { useVariablesStore } from "@/stores/variablesStore";
import { runCode } from "@/lib/utils";
import MainWindow from "./MainWindow";
import ConsoleWindow from "./ConsoleWindow";
import ReturnWindow from "./ReturnWindow";

export default function Editor() {
    const [value, setValue] = useState('const message = str.toUpperCase()\n\nreturn message + "!"');
    const [returnValue, setReturnValue] = useState("");
    const [consoleValue, setConsoleValue] = useState('');

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_1fr] gap-4 w-full">
            <div />

            <div className="row-start-1 col-start-2 flex flex-col w-200">
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
            </div>

            <div className="row-start-2 col-start-2 flex flex-col w-200 gap-4">
                <MainWindow
                    value={value}
                    height="100%"
                    handleChange={(val) => setValue(val)}
                />
                {returnValue && <ReturnWindow value={returnValue} />}
            </div>

            <div className="flex items-start row-start-2 col-start-3">
                <ConsoleWindow
                    value={consoleValue}
                    height="100%"
                />
            </div>
        </div>
    )
}


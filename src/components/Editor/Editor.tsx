"use client";

import { useState } from "react"
import Variables from "./Variables";
import { useVariablesStore } from "@/stores/variablesStore";
import { formatCode } from "@/lib/utils";
import MainWindow from "./MainWindow";
import ConsoleWindow from "./ConsoleWindow";
import ReturnWindow from "./ReturnWindow";

export default function Editor() {
    const [value, setValue] = useState('const message = str.toUpperCase()\n\nreturn message + "!"');
    const [returnValue, setReturnValue] = useState<string | null>(null);
    const [consoleValue, setConsoleValue] = useState("");
    const variables = useVariablesStore(s => s.variables);
    const [returnedCode, setReturnedCode] = useState<{ code: string; problem: string } | null>(null)
    const runCode = () => {
        const code = formatCode(value, variables)

        try {
            const result = new Function(code)();
            const output = typeof result === "string" ? result : JSON.stringify(result, null, 2);
            setReturnValue(output)
            console.log(code)
        } catch (error) {
            if (error instanceof Error) {
                setConsoleValue(`${error.name}:\n${error.message}`)
            } else {
                setConsoleValue(`Unknown error:\n${String(error)}`)
            }
            setReturnValue(null)
        }
    }

    const convertCode = async () => {
        try {
            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: formatCode(value, variables) }),
            });
            const data = await response.json();
            const converted = data ?? null;
            console.log(converted)
            setReturnedCode(converted);
        } catch (err) {
            console.log(String(err));
            setReturnedCode(null);
        };
    };

    return (
        <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_1fr] gap-4 w-full">
            <div />

            <div className="row-start-1 col-start-2 flex flex-col w-200">
                <button
                    onClick={() => {
                        setConsoleValue("");
                        runCode()
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 w-fit self-end font-semibold"
                >
                    Run Code
                </button>
                <button
                    onClick={() => {
                        convertCode()
                    }}
                    className="mt-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 w-fit self-end font-semibold"
                >
                    convert Code
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


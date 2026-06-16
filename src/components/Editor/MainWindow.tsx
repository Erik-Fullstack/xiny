import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { CodeMirrorProps } from "@/types/codeMirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useConversionStore } from "@/stores/conversionStore";

export default function MainWindow({ value, height, handleChange }: CodeMirrorProps) {
    const returnedCode = useConversionStore(s => s.returnedCode);

    return (
        <div className="h-125 overflow-hidden">
            <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424]">
                {returnedCode ? "Python" : "JavaScript"}
            </div>
            <CodeMirror
                value={value}
                theme={vscodeDark}
                height={height}
                extensions={returnedCode ? [python()] : [javascript({ jsx: true })]}
                onChange={handleChange}
                className="w-full h-full text-base"
            />
        </div>
    )
}

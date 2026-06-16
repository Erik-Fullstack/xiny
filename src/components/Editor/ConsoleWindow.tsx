import CodeMirror from "@uiw/react-codemirror";
import { CodeMirrorProps } from "@/types/codeMirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CopyButton from "./CopyButton";
import { getLanguageExtension } from "@/lib/languageUtils";

export default function ConsoleWindow({ value, height }: CodeMirrorProps) {
    return (
        <div className="h-125 overflow-hidden w-80">
            <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424] w-4/5">
                Console
                <CopyButton value={value} />
            </div>
            <CodeMirror
                value={value}
                theme={vscodeDark}
                height={height}
                extensions={[getLanguageExtension('javascript')]}
                editable={false}
                className="w-4/5 h-full text-base bg-surface"
            />
        </div>
    )
}
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { CodeMirrorProps } from "@/types/codeMirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CopyButton from "./CopyButton";

export default function MainWindow({ value }: CodeMirrorProps) {
    return (
        <div className="overflow-hidden">
            <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424] w-full">
                Return
                <CopyButton value={value} />
            </div>
            <CodeMirror
                value={value}
                theme={vscodeDark}
                extensions={[javascript({ jsx: true })]}
                editable={false}
                className="w-full h-full text-base  bg-surface"
            />
        </div>
    )
}
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { CodeMirrorProps } from "@/types/codeMirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export default function MainWindow({ value, height }: CodeMirrorProps) {
    return (
        <div className="h-125 overflow-hidden w-80">
            <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424] w-4/5">Console</div>
            <CodeMirror
                value={value}
                theme={vscodeDark}
                height={height}
                extensions={[javascript({ jsx: true })]}
                editable={false}
                className="w-4/5 h-full text-base bg-surface"
            />
        </div>
    )
}
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { CodeMirrorProps } from "@/types/codeMirror";

export default function MainWindow({value, theme, height, handleChange}: CodeMirrorProps) {
    return (
        <div className="h-125 overflow-hidden">
            <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424]">JavaScript</div>
            <CodeMirror
                value={value}
                theme={theme ?? "dark"}
                height={height}
                extensions={[javascript({ jsx: true })]}
                onChange={handleChange}
                className="w-full h-full text-base border border-input dark:focus-within:border-primary"
            />
        </div>
    )
}

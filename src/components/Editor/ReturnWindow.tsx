import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { CodeMirrorProps } from "@/types/codeMirror";

export default function MainWindow({ value, theme, height}: CodeMirrorProps) {
    return (
        <div className="overflow-hidden">
            <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424] w-full">Return</div>
            <CodeMirror
                value={value}
                theme={theme}
                extensions={[javascript({ jsx: true })]}
                editable={false}
                className="w-full h-full text-base border border-input dark:focus-within:border-primary bg-surface"
            />
        </div>
    )
}
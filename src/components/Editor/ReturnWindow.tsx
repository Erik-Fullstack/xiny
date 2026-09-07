import CodeMirror from "@uiw/react-codemirror";
import { CodeMirrorProps } from "@/types/codeMirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CopyButton from "./CopyButton";
import { getLanguageExtension } from "@/lib/languageUtils";

export default function ReturnWindow({ value }: CodeMirrorProps) {
  return (
    <div className="overflow-hidden">
      <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424] w-full">
        Return
        <CopyButton value={value} />
      </div>
      <CodeMirror
        value={value}
        theme={vscodeDark}
        extensions={[getLanguageExtension("javascript")]}
        editable={false}
        className="w-full h-full text-base  bg-surface"
      />
    </div>
  );
}

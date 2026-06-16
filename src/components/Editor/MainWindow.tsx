import CodeMirror from "@uiw/react-codemirror";
import { CodeMirrorProps } from "@/types/codeMirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useConversionStore } from "@/stores/conversionStore";
import CopyButton from "./CopyButton";
import { getLanguageExtension } from "@/lib/languageUtils";
import { SUPPORTED_LANGUAGES } from "@/types/languages";

export default function MainWindow({ value, height, handleChange }: CodeMirrorProps) {
    const { returnedCode, firstLang, finalLang } = useConversionStore();

    const currentLangValue = returnedCode ? finalLang : firstLang;
    const currentLangLabel = SUPPORTED_LANGUAGES.find(l => l.value === currentLangValue)?.label ?? currentLangValue;

    return (
        <div className="h-125 overflow-hidden">
            <div className="flex items-center pl-2 h-8 text-xs dark:bg-[#242424]">
                {currentLangLabel}
                <CopyButton value={value} />
            </div>
            <CodeMirror
                value={value}
                theme={vscodeDark}
                height={height}
                extensions={[getLanguageExtension(currentLangValue)]}
                onChange={handleChange}
                className="w-full h-full text-base"
            />
        </div>
    )
}

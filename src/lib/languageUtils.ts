import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { rust } from "@codemirror/lang-rust";
import { SupportedLanguage } from "@/types/languages";

export function getLanguageExtension(lang: SupportedLanguage) {
  switch (lang) {
    case "javascript":
      return javascript({ jsx: true });
    case "python":
      return python();
    case "java":
      return java();
    case "cpp":
      return cpp();
    case "go":
      return go();
    case "rust":
      return rust();
    default:
      return javascript({ jsx: true });
  }
}

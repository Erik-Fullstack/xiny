import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/types/languages";
import { useConversionStore } from "@/stores/conversionStore";

export default function LanguageSelectors() {
  const { firstLang, finalLang, setFirstLang, setFinalLang, returnedCode } =
    useConversionStore();

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase opacity-60">
          Input Language
        </label>
        <select
          value={firstLang}
          onChange={(e) => setFirstLang(e.target.value as SupportedLanguage)}
          disabled={!!returnedCode}
          className="bg-[#1e1e1e] border border-white/10 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary h-10 w-40"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-center mt-5 text-xl opacity-40">
        ➔
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase opacity-60">
          Convert To
        </label>
        <select
          value={finalLang}
          onChange={(e) => setFinalLang(e.target.value as SupportedLanguage)}
          disabled={!!returnedCode}
          className="bg-[#1e1e1e] border border-white/10 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary h-10 w-40"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

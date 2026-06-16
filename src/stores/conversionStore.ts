import { create } from 'zustand'
import { SupportedLanguage } from '@/types/languages';

interface ConversionResult {
    code: string;
    problem: string;
}

interface ConversionState {
    firstLang: SupportedLanguage;
    finalLang: SupportedLanguage;
    setFirstLang: (lang: SupportedLanguage) => void;
    setFinalLang: (lang: SupportedLanguage) => void;
    returnedCode: ConversionResult | null;
    setReturnedCode: (code: ConversionResult | null) => void;
}

export const useConversionStore = create<ConversionState>((set) => ({
    firstLang: 'javascript',
    finalLang: 'python',
    setFirstLang: (lang) => set({ firstLang: lang }),
    setFinalLang: (lang) => set({ finalLang: lang }),
    returnedCode: null,
    setReturnedCode: (code) => set({ returnedCode: code }),
}))

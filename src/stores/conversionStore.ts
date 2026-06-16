import { create } from 'zustand'

interface ConversionResult {
    code: string;
    problem: string;
}

interface ConversionState {
    returnedCode: ConversionResult | null;
    setReturnedCode: (code: ConversionResult | null) => void;
}

export const useConversionStore = create<ConversionState>((set) => ({
    returnedCode: null,
    setReturnedCode: (code) => set({ returnedCode: code }),
}))

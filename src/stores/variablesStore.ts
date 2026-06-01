import { create } from 'zustand'

interface VariablesState {
    variables: string[];
    setVariables: (index: number, newValue: string) => void;
}

export const useVariablesStore = create<VariablesState>((set) => ({
    variables: ['const str = "Hello World!"', ''],
    setVariables: (index, newValue) => set(({variables}) => {
        const updated = [...variables];
        updated[index] = newValue;
        const filtered = updated.filter(val => val.trim() !== "");
        filtered.push("");

        return { variables: filtered };
    }),
}))
"use client";

import { Input } from "@/components/ui/input";
import { useVariablesStore } from "@/stores/variablesStore";

export default function Variables() {
    const variables = useVariablesStore((state) => state.variables);
    const setVariables = useVariablesStore((state) => state.setVariables);

    return (
        <div className="flex flex-wrap-reverse gap-1">
            {variables.map((val, i) => (
                <Input
                    key={i}
                    value={val}
                    onChange={(e) => setVariables(i, e.target.value)}
                    className="w-[calc(33.33%-0.25rem)]"
                    placeholder={`var num = ${i + 1}`}
                />
            ))}
        </div>
    );
}

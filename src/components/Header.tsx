"use client";

import { useEffect, useState } from "react";
import { SearchIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { useConversionStore } from "@/stores/conversionStore";
import { Conversion } from "@/types/conversion";

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Conversion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { setReturnedCode, setFirstLang, setFinalLang } = useConversionStore();

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        const debounceTimer = setTimeout(async () => {
            setIsLoading(true);
            setIsOpen(true);
            try {
                const response = await fetch(`/api/conversions/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data.conversions || []);
            } catch (error) {
                console.error("Search failed:", error);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSelect = (conversion: Conversion) => {
        setReturnedCode({
            code: conversion.pythonCode,
            problem: conversion.problemDescription
        });
        setFirstLang(conversion.sourceLanguage);
        setFinalLang(conversion.targetLanguage);
        setIsOpen(false);
        setQuery("");
    };

    return (
        <header className="sticky top-0 z-50 bg-background dark:bg-[#131313] flex justify-center items-center w-full py-2.5 border-b-2">
            <div className="relative w-full max-w-2xl">
                <InputGroup className="flex items-center w-full h-10 dark:bg-[#1f1f1f]">
                    <InputGroupInput
                        className="placeholder:opacity-80"
                        placeholder="Search for code..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.trim() && setIsOpen(true)}
                    />
                    <InputGroupAddon className="px-3" align="inline-start">
                        {isLoading ? <Loader2 className="animate-spin" /> : <SearchIcon />}
                    </InputGroupAddon>
                </InputGroup>

                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 shadow-xl z-50 max-h-96 overflow-y-auto">
                        {results.length > 0 ? (
                            <ul className="py-2">
                                {results.map((res) => (
                                    <li
                                        key={res._id}
                                        onClick={() => handleSelect(res)}
                                        className="px-4 py-3 hover:bg-muted cursor-pointer border-b last:border-0"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold uppercase text-primary">
                                                {res.sourceLanguage} → {res.targetLanguage}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {new Date(res.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm line-clamp-2">{res.problemDescription}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : !isLoading && query.trim() ? (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                                No results found for "{query}"
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            <div className="absolute right-10">
                <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Theme</Button>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </header>
    )
}

interface RowsContainerProps {
    lineCount: number;
    scrollTop: number;
}

export default function RowsContainer({ lineCount, scrollTop }: RowsContainerProps) {
    const lines = Array.from({ length: Math.max(1, lineCount) }, (_, idx) => idx + 1);

    return (
        <div className="h-full w-12 shrink-0 overflow-hidden border border-input dark:bg-[#0e0e0e] py-2 text-center text-base text-muted-foreground md:text-sm select-none">
            <div style={{ transform: `translateY(-${scrollTop}px)` }}>
                {lines.map((n) => (
                    <p key={n}>{n}</p>
                ))}
            </div>
        </div>
    )
}

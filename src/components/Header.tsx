import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export default function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="sticky top-0 z-10 bg-background dark:bg-[#131313] flex justify-center items-center w-full py-2.5 border-b-2">
            <InputGroup className="flex items-center w-full max-w-2xl h-10 dark:bg-[#1f1f1f]">
                <InputGroupInput className="placeholder:opacity-80" placeholder="Search for code..." />
                <InputGroupAddon className="px-3" align="inline-start">
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            <div className="absolute right-10">
                <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>Theme</Button>
            </div>
        </header>
    )
}

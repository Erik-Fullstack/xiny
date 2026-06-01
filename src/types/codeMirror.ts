export type CodeMirrorProps = {
    value: string;
    theme?: "dark" | "light";
    height?: string;
    handleChange?: (code: string) => void;
}
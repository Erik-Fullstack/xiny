import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ParsedVar } from "@/types/jsVariables";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parses variables from strings to structured variable objects.
 * 
 * @param vars string[]
 * @remarks Removes the last index of the array
 * because it will always contain an empty str.
 * @returns ParseVar[] containing declaration, key, and value
 */
export function parseVars(vars: string[]): ParsedVar[] {
  const results: ParsedVar[] = [];
  const variables = [...vars].slice(0, -1);

  const regex = /^(?:(const|let|var)\s+)?([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=\s*(.*)$/;

  for (const pair of variables) {
    const match = pair.trim().match(regex);
    if (!match) continue;

    results.push({
      decl: (match[1] as "const" | "let" | "var") || "let",
      key: match[2].trim(),
      value: match[3].trim(),
    });
  }
  return results;
}

/**
 * Formats the vars from object to codelines.
 * @param parsedVars Parsedvar[] including declaration, key and value.
 * @returns String A string with colon added after each variable and newline in between.
 */
export function formatVars(parsedVars: ParsedVar[]) {
  return parsedVars.map(v => `${v.decl} ${v.key} = ${v.value};`).join('\n')
}

/**
 * Formats the variables and codesnippet into executable code.
 * 
 * @param code string Everything written in the main editor.  
 * @param vars string[] Variables as full string from inputs.
 * @returns string Executable code as a string.
 */
export function formatCode(code: string, vars: string[]) {
  const parsedVars = parseVars(vars);
  const formattedVars = formatVars(parsedVars);
  const executableCode = `
const script = () => {
  ${formattedVars}
  ${code}
};
return script();
`
  return executableCode
}
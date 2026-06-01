import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ParsedVar } from "@/types/jsVariables";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats variables from strings to structured variable objects.
 * 
 * @param vars string[]
 * @remarks Removes the last index of the array
 * because it will always contain an empty str.
 * @returns ParsedVar[] containing declaration, key, and value
 */
export function formatVars(vars: string[]): ParsedVar[] {
  const results: ParsedVar[] = [];
  const variables = vars.length > 1 ? [...vars].slice(0, -1) : [...vars];

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
 * Runs the code provided and logs/alerts the return value.
 * 
 * @param codeAsString string The code to execute.
 * @param vars string[] of all variables used.
 */
export function runCode(codeAsString: string, vars: string[],) {
  const parsedVars = formatVars(vars);

  const varStatements = parsedVars.map(v => `${v.decl} ${v.key} = ${v.value};`).join('\n');

  const executableCode = `
            ${varStatements}
            // Execute the code provided in the editor (we wrap in an IIFE so returns are handled properly)
            const userScript = () => {
                ${codeAsString}
            };
            return userScript();
        `;

  try {
    const result = new Function(executableCode)();
    console.log("Execution Result:", result);
    alert("Execution Result:\n" + result);
  } catch (err) {
    console.error("Error executing code:", err);
    alert("Error:\n" + (err as Error).message);
  }
};
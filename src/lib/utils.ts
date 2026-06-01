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
 * Runs the code provided and logs/alerts the return value.
 * 
 * @param codeAsString string The code to execute.
 * @param vars string[] of all variables used.
 */
export function runCode(codeAsString: string, vars: string[], onLog?: (msg: string) => void) {
  const parsedVars = formatVars(vars);

  const varStatements = parsedVars.map(v => `${v.decl} ${v.key} = ${v.value};`).join('\n');

  const executableCode = `
            ${varStatements}
            const userScript = () => {
                ${codeAsString}
            };
            return userScript();
        `;

  const logger = onLog ?? ((msg: string) => console.log(msg));

  try {
    const result = new Function(executableCode)();
    const out = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    logger("Execution Result:\n" + out);
    return result;
  } catch (err) {
    console.error("Error executing code:", err);
    const message = (err as Error).message || String(err);
    logger("Error:\n" + message);
    return undefined;
  }
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats variables from strings to key value pairs.
 * 
 * @param vars string[]
 * @remarks Removes the last index of the array
 * because it will always contain an empty str.
 * @returns An object where keys are the variable name
 * and value is the corresponding value or
 * null if broken syntax.
 */
export function formatVars(vars: string[]): Record<string, string> | null {
  let pairs: Record<string, string> | null = {}
  const variables = [...vars].slice(0, -1)
  for (const pair of variables) {
    let split = ""
    if (pair.includes(" = ")) {
      split = " = "
    } else if (pair.includes(" =")) {
      split = " ="
    } else if (pair.includes("= ")) {
      split = "= "
    } else if (pair.includes("=")) {
      split = "="
    }

    if (!split) {
      pairs = null
      break;
    };

    const [key, value] = pair.split(split)
    pairs![key] = value
  }
  return pairs;
}
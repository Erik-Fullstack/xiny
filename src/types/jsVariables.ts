export interface ParsedVar {
  decl: "const" | "let" | "var";
  key: string;
  value: string;
}

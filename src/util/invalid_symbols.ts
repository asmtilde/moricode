export const invalidSymbols = /[\s_]/;

export function hasInvalidSymbols(text: string): boolean {
  return invalidSymbols.test(text);
}

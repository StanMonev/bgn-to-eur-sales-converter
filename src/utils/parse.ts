export function parseNumber(input: string): number | null {
  const normalized = input.trim().replace(",", ".");
  if (!normalized) return null;
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

import type { Lang } from "./useLang";
import type { Bilingual } from "@/content/types";

export const INK = "#241B14";
export const BROWN = "#6B4F33";
export const MOSS = "#5C6B4E";
export const CHILI = "#9C3B2C";
export const SAND = "#F1E8D6";
export const RULE = `${BROWN}33`;

// Text/label tones used on dark (INK) grounds. Kept as named tokens, not
// repeated hex literals, so the palette stays locked to one family.
export const CREAM = SAND;
export const CREAM_DIM = "#E7D9BC";
export const GOLD_DIM = "#C9B591";

export function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function t(lang: Lang, b: Bilingual) {
  return lang === "vi" ? b.vi : b.en;
}

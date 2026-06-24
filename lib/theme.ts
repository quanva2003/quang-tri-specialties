import type { Lang } from "./useLang";
import type { Bilingual } from "@/content/types";

export const INK = "#241B14";
export const BROWN = "#6B4F33";
export const MOSS = "#5C6B4E";
export const CHILI = "#9C3B2C";
export const SAND = "#F1E8D6";
export const RULE = `${BROWN}33`;

export function t(lang: Lang, b: Bilingual) {
  return lang === "vi" ? b.vi : b.en;
}

import type { Lang } from "@/lib/useLang";
import { CREAM, CREAM_DIM, INK } from "@/lib/theme";

export function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/25 p-0.5 text-sm">
      {(["vi", "en"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className="rounded-full px-2.5 py-1 font-medium transition-colors"
            style={{ backgroundColor: active ? CREAM : "transparent", color: active ? INK : CREAM_DIM }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.color = CREAM;
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.color = CREAM_DIM;
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

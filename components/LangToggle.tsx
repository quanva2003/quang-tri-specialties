import type { Lang } from "@/lib/useLang";

export function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/25 p-0.5 text-sm">
      {(["vi", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
            lang === l ? "bg-[#F1E8D6] text-[#241B14]" : "text-[#E7D9BC] hover:text-[#F1E8D6]"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

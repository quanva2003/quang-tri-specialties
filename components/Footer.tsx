import type { Lang } from "@/lib/useLang";
import { t, BROWN, RULE } from "@/lib/theme";
import { copy } from "@/content/copy";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="px-6 py-10 md:px-12" style={{ borderTop: `1px solid ${RULE}` }}>
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <span className="font-heading text-base">Quảng Trị</span>
        <p className="text-sm" style={{ color: BROWN }}>
          {t(lang, copy.footer.text)}
        </p>
      </div>
    </footer>
  );
}

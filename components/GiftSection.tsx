import type { Lang } from "@/lib/useLang";
import { t, INK, CREAM, GOLD_DIM, withAlpha } from "@/lib/theme";
import { copy } from "@/content/copy";
import type { Gift } from "@/content/gifts";
import { PhotoFrame } from "./PhotoFrame";

export function GiftSection({ lang, gifts }: { lang: Lang; gifts: Gift[] }) {
  return (
    <section id="gifts" className="scroll-mt-24 py-20 md:py-28" style={{ backgroundColor: INK }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <h2 className="font-heading text-3xl leading-tight tracking-tight md:text-4xl" style={{ color: CREAM }}>
          {t(lang, copy.sections.gifts)}
        </h2>
      </div>
      <div className="relative mt-10">
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 md:px-12" style={{ scrollSnapType: "x mandatory" }}>
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="flex-shrink-0 overflow-hidden rounded-sm transition-transform duration-300 hover:-translate-y-1"
              style={{ scrollSnapAlign: "start", width: "min(320px, 80vw)" }}
            >
              <PhotoFrame
                src={gift.image}
                alt={t(lang, gift.name)}
                seed={gift.id}
                frameClassName="aspect-[4/5] w-full"
                sizes="min(320px, 80vw)"
              />
              <div className="pt-4">
                <h3 className="font-heading text-lg leading-snug" style={{ color: CREAM }}>
                  {t(lang, gift.name)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: GOLD_DIM }}>
                  {t(lang, gift.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 md:block"
          style={{ background: `linear-gradient(270deg, ${withAlpha(INK, 1)} 0%, ${withAlpha(INK, 0)} 100%)` }}
        />
      </div>
    </section>
  );
}

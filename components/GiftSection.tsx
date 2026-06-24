import type { Lang } from "@/lib/useLang";
import { t, INK } from "@/lib/theme";
import { copy } from "@/content/copy";
import type { Gift } from "@/content/gifts";
import { PhotoFrame } from "./PhotoFrame";

export function GiftSection({ lang, gifts }: { lang: Lang; gifts: Gift[] }) {
  return (
    <section id="gifts" className="scroll-mt-24 py-20 md:py-28" style={{ backgroundColor: INK }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <h2 className="font-heading text-3xl leading-tight text-[#F1E8D6] md:text-4xl">
          {t(lang, copy.sections.gifts)}
        </h2>
      </div>
      <div className="mt-10 flex gap-5 overflow-x-auto px-6 pb-4 md:px-12" style={{ scrollSnapType: "x mandatory" }}>
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="flex-shrink-0 overflow-hidden rounded-sm"
            style={{ scrollSnapAlign: "start", width: "min(320px, 80vw)" }}
          >
            <PhotoFrame
              src={gift.image}
              alt={t(lang, gift.name)}
              seed={gift.id}
              frameClassName="aspect-[4/5] w-full"
            />
            <div className="pt-4">
              <h3 className="font-heading text-lg leading-snug text-[#F1E8D6]">{t(lang, gift.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#C9B591]">{t(lang, gift.desc)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

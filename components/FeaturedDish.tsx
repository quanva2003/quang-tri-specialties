import type { Lang } from "@/lib/useLang";
import { t, INK, MOSS, CREAM, CREAM_DIM, GOLD_DIM } from "@/lib/theme";
import { copy } from "@/content/copy";
import type { Dish } from "@/content/dishes";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";

export function FeaturedDish({ lang, dish }: { lang: Lang; dish: Dish }) {
  return (
    <section id="featured" className="grid scroll-mt-24 grid-cols-1 md:grid-cols-12">
      <div className="group md:col-span-7">
        <PhotoFrame
          src={dish.image}
          alt={t(lang, dish.name)}
          seed={dish.id}
          frameClassName="h-[60vh] w-full md:h-[90vh]"
          imgClassName="transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      <div
        className="flex flex-col justify-center px-6 py-16 md:col-span-5 md:px-14 md:py-0"
        style={{ backgroundColor: INK }}
      >
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD_DIM }}>
            {t(lang, copy.sections.featured)}
          </span>
          <h2 className="font-heading mt-4 text-3xl leading-tight tracking-tight md:text-5xl" style={{ color: CREAM }}>
            {t(lang, dish.name)}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed md:text-lg" style={{ color: CREAM_DIM }}>
            {t(lang, dish.desc)}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full px-3 py-1 text-xs font-medium text-white" style={{ backgroundColor: MOSS }}>
              {dish.village}
            </span>
            {dish.tag && (
              <span className="text-xs" style={{ color: GOLD_DIM }}>
                {t(lang, dish.tag)}
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

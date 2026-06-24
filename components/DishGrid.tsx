import type { Lang } from "@/lib/useLang";
import { t, INK, CREAM, GOLD_DIM, withAlpha } from "@/lib/theme";
import { copy } from "@/content/copy";
import type { Dish } from "@/content/dishes";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";

export function DishGrid({ lang, dishes }: { lang: Lang; dishes: Dish[] }) {
  return (
    <section id="dishes" className="scroll-mt-24 px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-heading text-3xl leading-tight tracking-tight md:text-4xl">
          {t(lang, copy.sections.dishes)}
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {dishes.map((dish, i) => {
            const big = i % 5 === 0;
            return (
              <Reveal
                key={dish.id}
                delayMs={(i % 4) * 70}
                className={`group relative overflow-hidden rounded-sm ${big ? "col-span-2 row-span-2" : "col-span-1"}`}
              >
                <PhotoFrame
                  src={dish.image}
                  alt={t(lang, dish.name)}
                  seed={dish.id}
                  frameClassName={big ? "aspect-square w-full" : "aspect-[4/3] w-full"}
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                  sizes={big ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${withAlpha(INK, 0)} 55%, ${withAlpha(INK, 0.82)} 100%)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <span className="text-[11px] font-medium" style={{ color: GOLD_DIM }}>
                    {dish.village}
                  </span>
                  <h3 className="font-heading mt-0.5 text-base leading-snug md:text-lg" style={{ color: CREAM }}>
                    {t(lang, dish.name)}
                  </h3>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

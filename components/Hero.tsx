import type { Lang } from "@/lib/useLang";
import { t, CREAM, CREAM_DIM, INK, withAlpha } from "@/lib/theme";
import { copy } from "@/content/copy";
import { PhotoFrame } from "./PhotoFrame";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden"
    >
      <PhotoFrame
        src={copy.hero.image}
        alt=""
        seed="hero"
        frameClassName="absolute inset-0 h-full w-full"
        eager
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${withAlpha(INK, 0.45)} 0%, ${withAlpha(INK, 0.15)} 30%, ${withAlpha(INK, 0.85)} 100%)`,
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-12 md:pb-20">
        <h1
          className="animate-fade-up font-heading max-w-3xl text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
          style={{ color: CREAM }}
        >
          {t(lang, copy.hero.headline)}
        </h1>
        <p
          className="animate-fade-up mt-5 max-w-lg text-base leading-relaxed md:text-lg"
          style={{ color: CREAM_DIM, animationDelay: "120ms" }}
        >
          {t(lang, copy.hero.subhead)}
        </p>
      </div>
    </section>
  );
}

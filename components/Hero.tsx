import type { Lang } from "@/lib/useLang";
import { t } from "@/lib/theme";
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
          background:
            "linear-gradient(180deg, rgba(36,27,20,0.45) 0%, rgba(36,27,20,0.15) 30%, rgba(36,27,20,0.85) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-12 md:pb-20">
        <h1 className="font-heading max-w-2xl text-4xl leading-[1.1] text-[#F1E8D6] md:text-6xl">
          {t(lang, copy.hero.headline)}
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#E7D9BC] md:text-lg">
          {t(lang, copy.hero.subhead)}
        </p>
      </div>
    </section>
  );
}

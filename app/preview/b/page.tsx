"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { dishes } from "@/content/dishes";
import { gifts } from "@/content/gifts";
import type { Bilingual } from "@/content/types";

const INK = "#241B14";
const BROWN = "#6B4F33";
const MOSS = "#5C6B4E";
const CHILI = "#9C3B2C";
const SAND = "#F1E8D6";

function t(lang: Lang, b: Bilingual) {
  return lang === "vi" ? b.vi : b.en;
}

const villages: { name: string; x: number; y: number }[] = [
  { name: "Vĩnh Linh", x: 150, y: 60 },
  { name: "Hồ Xá", x: 210, y: 110 },
  { name: "Cam Lộ", x: 130, y: 190 },
  { name: "Đông Hà", x: 220, y: 230 },
  { name: "Mai Xá", x: 270, y: 250 },
  { name: "Chợ Sãi", x: 180, y: 300 },
  { name: "Mỹ Chánh", x: 230, y: 340 },
  { name: "Phương Lang", x: 150, y: 380 },
  { name: "Hải Lăng", x: 190, y: 430 },
  { name: "Hướng Hóa", x: 90, y: 470 },
  { name: "Khe Sanh", x: 70, y: 510 },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      className="flex items-center gap-1 rounded-full px-1.5 py-1 text-sm backdrop-blur-md"
      style={{ backgroundColor: "rgba(36,27,20,0.35)", border: "1px solid rgba(255,255,255,0.25)" }}
    >
      {(["vi", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="rounded-full px-3 py-1 font-medium transition-colors"
          style={{
            color: lang === l ? INK : "#F1E8D6",
            backgroundColor: lang === l ? SAND : "transparent",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function PageContent() {
  const { lang, setLang } = useLang();
  const featured = dishes[0];
  const restDishes = dishes.slice(1);

  return (
    <div className="min-h-dvh" style={{ backgroundColor: SAND, color: INK }}>
      {/* Hero: full-bleed photography, text anchored bottom-left */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">
        <img
          src="https://picsum.photos/seed/quang-tri-mien-trung-gio-cat/1920/1280"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(36,27,20,0.45) 0%, rgba(36,27,20,0.15) 30%, rgba(36,27,20,0.85) 100%)",
          }}
        />
        <header className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
          <span className="font-heading text-lg tracking-tight text-[#F1E8D6]">Quảng Trị</span>
          <LangToggle lang={lang} setLang={setLang} />
        </header>
        <div className="relative z-10 flex h-[calc(100dvh-88px)] max-w-[1400px] flex-col justify-end px-6 pb-16 md:mx-auto md:px-12 md:pb-20">
          <h1 className="font-heading max-w-2xl text-4xl leading-[1.1] text-[#F1E8D6] md:text-6xl">
            {t(lang, copy.hero.headline)}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#E7D9BC] md:text-lg">
            {t(lang, copy.hero.subhead)}
          </p>
        </div>
      </section>

      {/* Featured dish: large image, text on a dark panel */}
      <section className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7">
          <img
            src={`https://picsum.photos/seed/${featured.id}/1400/1500`}
            alt={t(lang, featured.name)}
            className="h-[60vh] w-full object-cover md:h-[90vh]"
            loading="lazy"
          />
        </div>
        <div
          className="flex flex-col justify-center px-6 py-16 md:col-span-5 md:px-14 md:py-0"
          style={{ backgroundColor: INK }}
        >
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "#C9B591" }}>
              {t(lang, copy.sections.featured)}
            </span>
            <h2 className="font-heading mt-4 text-3xl leading-tight text-[#F1E8D6] md:text-5xl">
              {t(lang, featured.name)}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#E7D9BC] md:text-lg">
              {t(lang, featured.desc)}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-medium text-white" style={{ backgroundColor: MOSS }}>
                {featured.village}
              </span>
              {featured.tag && (
                <span className="text-xs" style={{ color: "#C9B591" }}>
                  {t(lang, featured.tag)}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Dish gallery: asymmetric photo-led grid */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-heading text-3xl leading-tight md:text-4xl">{t(lang, copy.sections.dishes)}</h2>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {restDishes.map((dish, i) => {
              const big = i % 5 === 0;
              return (
                <Reveal
                  key={dish.id}
                  className={`group relative overflow-hidden rounded-sm ${big ? "col-span-2 row-span-2" : "col-span-1"}`}
                >
                  <img
                    src={`https://picsum.photos/seed/${dish.id}/${big ? 900 : 480}/${big ? 900 : 480}`}
                    alt={t(lang, dish.name)}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      big ? "aspect-square" : "aspect-[4/3]"
                    }`}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, rgba(36,27,20,0) 55%, rgba(36,27,20,0.82) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span className="text-[11px] font-medium" style={{ color: "#D7C9A3" }}>
                      {dish.village}
                    </span>
                    <h3 className="font-heading mt-0.5 text-base leading-snug text-[#F1E8D6] md:text-lg">
                      {t(lang, dish.name)}
                    </h3>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gifts: horizontal scroll-snap gallery */}
      <section className="py-20 md:py-28" style={{ backgroundColor: INK }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <h2 className="font-heading text-3xl leading-tight text-[#F1E8D6] md:text-4xl">
            {t(lang, copy.sections.gifts)}
          </h2>
        </div>
        <div className="mt-10 flex gap-5 overflow-x-auto px-6 pb-4 md:px-12" style={{ scrollSnapType: "x mandatory" }}>
          {gifts.map((gift, i) => (
            <div
              key={i}
              className="flex-shrink-0 overflow-hidden rounded-sm"
              style={{ scrollSnapAlign: "start", width: "min(320px, 80vw)" }}
            >
              <img
                src={`https://picsum.photos/seed/qt-gift-${i}/640/800`}
                alt={t(lang, gift.name)}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div className="pt-4">
                <h3 className="font-heading text-lg leading-snug text-[#F1E8D6]">{t(lang, gift.name)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C9B591]">{t(lang, gift.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craft map */}
      <section className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-heading text-3xl leading-tight md:text-4xl">{t(lang, copy.sections.craftMap)}</h2>
          <p className="mt-3 text-sm" style={{ color: BROWN }}>
            {lang === "vi"
              ? "Minh hoạ, sẽ thay bằng bản đồ làng nghề chi tiết."
              : "Illustrative placeholder, to be replaced with a detailed craft map."}
          </p>
          <div className="mt-10 flex justify-center">
            <svg viewBox="0 0 400 600" className="h-[480px] w-full max-w-sm" aria-hidden="true">
              <path
                d="M150 60 C 200 90, 200 130, 210 110 C 220 150, 110 170, 130 190 C 150 210, 240 210, 220 230 C 200 250, 290 240, 270 250 C 250 260, 160 280, 180 300 C 200 320, 250 320, 230 340 C 210 360, 130 360, 150 380 C 170 400, 210 410, 190 430 C 170 450, 100 450, 90 470 C 80 490, 80 490, 70 510"
                fill="none"
                stroke={BROWN}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
              {villages.map((v) => (
                <g key={v.name}>
                  <circle cx={v.x} cy={v.y} r="5" fill={CHILI} />
                  <text x={v.x + 12} y={v.y + 4} className="font-heading" fontSize="13" fill={INK}>
                    {v.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 md:px-12" style={{ borderTop: `1px solid ${BROWN}33` }}>
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <span className="font-heading text-base">Quảng Trị</span>
          <p className="text-sm" style={{ color: BROWN }}>
            {t(lang, copy.footer.text)}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function PreviewBPage() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}

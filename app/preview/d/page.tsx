"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { useLang, type Lang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { dishes } from "@/content/dishes";
import { gifts } from "@/content/gifts";
import type { Bilingual } from "@/content/types";

/**
 * Design read: bilingual diaspora-nostalgia landing for Quảng Trị regional
 * food. Base direction follows variant B (immersive photography-led hero,
 * full-bleed storytelling); the Craft Map section borrows variant C's
 * structured magazine-grid treatment (map + legend split, rule-led header).
 * New for this variant: a persistent header with section-anchor navigation.
 * Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 5, VISUAL_DENSITY 4.
 */

const INK = "#241B14";
const BROWN = "#6B4F33";
const MOSS = "#5C6B4E";
const CHILI = "#9C3B2C";
const SAND = "#F1E8D6";
const RULE = `${BROWN}33`;

function t(lang: Lang, b: Bilingual) {
  return lang === "vi" ? b.vi : b.en;
}

const PLACEHOLDER_TONES = [BROWN, MOSS, "#C9B591", "#8C6A45", "#7A8566"];

function placeholderTone(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_TONES[hash % PLACEHOLDER_TONES.length];
}

/**
 * Reserves its box size (via `frameClassName`, e.g. an aspect-ratio or fixed
 * height) up front so layout never shifts, then falls back to a blurred
 * brand-tone gradient if the real photo isn't dropped into /public yet.
 */
function PhotoFrame({
  src,
  alt,
  seed,
  frameClassName = "",
  imgClassName = "",
  eager = false,
}: {
  src: string;
  alt: string;
  seed: string;
  frameClassName?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const tone = placeholderTone(seed);

  return (
    <div
      className={`relative overflow-hidden ${frameClassName}`}
      style={{ background: `linear-gradient(135deg, ${tone}66, ${tone}22)` }}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          loading={eager ? "eager" : "lazy"}
        />
      )}
    </div>
  );
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

const navItems: { id: string; label: Bilingual }[] = [
  { id: "hero", label: copy.nav.home },
  { id: "featured", label: copy.nav.featured },
  { id: "dishes", label: copy.nav.dishes },
  { id: "gifts", label: copy.nav.gifts },
  { id: "map", label: copy.nav.map },
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
    <div className="flex items-center gap-1 text-sm">
      {(["vi", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className="rounded-full px-2.5 py-1 font-medium transition-colors"
          style={{ color: lang === l ? CHILI : BROWN }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="border-t pt-5" style={{ borderColor: RULE }}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: MOSS }}>
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading mt-2 text-3xl leading-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-30 px-4 md:top-6 md:px-6">
      <div
        className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 rounded-full px-4 py-2.5 backdrop-blur-md md:px-6"
        style={{ backgroundColor: "rgba(36,27,20,0.45)", border: "1px solid rgba(255,255,255,0.25)" }}
      >
        <a href="#hero" className="font-heading text-base tracking-tight text-[#F1E8D6] md:text-lg">
          Quảng Trị
        </a>
        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[#E7D9BC] transition-colors hover:text-[#F1E8D6]"
            >
              {t(lang, item.label)}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <button
          type="button"
          onClick={() => setNavOpen((open) => !open)}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          className="-mr-1 p-1.5 text-[#F1E8D6] lg:hidden"
        >
          {navOpen ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
        </button>
      </div>

      {navOpen && (
        <div
          className="mx-auto mt-2 max-w-[1400px] rounded-2xl px-6 py-5 backdrop-blur-md lg:hidden"
          style={{ backgroundColor: "rgba(36,27,20,0.7)", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          <nav className="flex flex-col gap-4 text-base text-[#E7D9BC]">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setNavOpen(false)}>
                {t(lang, item.label)}
              </a>
            ))}
          </nav>
          <div className="mt-5 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      )}
    </header>
  );
}

function PageContent() {
  const { lang, setLang } = useLang();
  const featured = dishes[0];
  const restDishes = dishes.slice(1);

  return (
    <div className="min-h-dvh" style={{ backgroundColor: SAND, color: INK }}>
      <Header lang={lang} setLang={setLang} />

      {/* Hero: full-bleed photography, text anchored bottom-left (from B) */}
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

      {/* Featured dish: large image, text on a dark panel (from B) */}
      <section id="featured" className="grid scroll-mt-24 grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-7">
          <PhotoFrame
            src={featured.image}
            alt={t(lang, featured.name)}
            seed={featured.id}
            frameClassName="h-[60vh] w-full md:h-[90vh]"
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

      {/* Dish gallery: asymmetric photo-led grid (from B) */}
      <section id="dishes" className="scroll-mt-24 px-6 py-20 md:px-12 md:py-28">
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
                  <PhotoFrame
                    src={dish.image}
                    alt={t(lang, dish.name)}
                    seed={dish.id}
                    frameClassName={big ? "aspect-square w-full" : "aspect-[4/3] w-full"}
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
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

      {/* Gifts: horizontal scroll-snap gallery (from B) */}
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

      {/* Craft map: map + legend split (treatment from C) */}
      <section id="map" className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24">
        <SectionHead title={t(lang, copy.sections.craftMap)} />
        <p className="mt-4 max-w-md text-sm" style={{ color: BROWN }}>
          {lang === "vi"
            ? "Minh hoạ, sẽ thay bằng bản đồ làng nghề chi tiết."
            : "Illustrative placeholder, to be replaced with a detailed craft map."}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="flex justify-center md:col-span-7">
            <svg viewBox="0 0 400 600" className="h-[440px] w-full max-w-sm" aria-hidden="true">
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
          <div className="md:col-span-5 md:border-l md:pl-12" style={{ borderColor: RULE }}>
            <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: MOSS }}>
              {lang === "vi" ? "Làng nghề" : "Villages"}
            </span>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm" style={{ color: BROWN }}>
              {villages.map((v) => (
                <li key={v.name}>{v.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 md:px-12" style={{ borderTop: `1px solid ${RULE}` }}>
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

export default function PreviewDPage() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}

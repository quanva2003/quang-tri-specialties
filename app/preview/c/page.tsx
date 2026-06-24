"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useLang, type Lang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { dishes } from "@/content/dishes";
import { gifts } from "@/content/gifts";
import type { Bilingual } from "@/content/types";

/**
 * Design read: bilingual diaspora-nostalgia landing for Quảng Trị regional
 * food, editorial magazine-grid language, Tailwind utilities + Playfair
 * Display / Be Vietnam Pro, restrained native-CSS motion (no added deps).
 * Dials: DESIGN_VARIANCE 7, MOTION_INTENSITY 4, VISUAL_DENSITY 6.
 * Emphasis: structured grid, repeating section rhythm, denser information
 * than the calm (variant A) and cinematic full-bleed (variant B) directions.
 */

const INK = "#2B2018";
const BROWN = "#6B4F33";
const MOSS = "#5C6B4E";
const CHILI = "#9C3B2C";
const SAND = "#F1E8D6";
const SAND_DEEP = "#E7D9BC";
const RULE = `${BROWN}33`;

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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
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

function DropCapParagraph({ text, color }: { text: string; color: string }) {
  const chars = Array.from(text);
  const first = chars[0] ?? "";
  const rest = chars.slice(1).join("");
  return (
    <p className="text-base leading-relaxed md:text-lg" style={{ color }}>
      <span
        className="font-heading float-left mr-2 mt-1 text-6xl leading-[0.8] md:text-7xl"
        style={{ color: CHILI }}
        aria-hidden="true"
      >
        {first}
      </span>
      {rest}
    </p>
  );
}

function PageContent() {
  const { lang, setLang } = useLang();
  const featured = dishes[0];
  const gridDishes = dishes.slice(1);
  const villageCount = new Set(dishes.map((d) => d.village)).size;

  const stats: { value: number; label: Bilingual }[] = [
    { value: dishes.length, label: { vi: "món ăn", en: "dishes" } },
    { value: villageCount, label: { vi: "làng nghề", en: "villages" } },
    { value: gifts.length, label: { vi: "đặc sản làm quà", en: "gifts" } },
  ];

  return (
    <div className="min-h-dvh" style={{ backgroundColor: SAND, color: INK }}>
      {/* Masthead: single line, sticky, max 72px */}
      <header
        className="sticky top-0 z-20 border-b backdrop-blur-md"
        style={{ borderColor: RULE, backgroundColor: `${SAND}CC` }}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12">
          <span className="font-heading text-lg tracking-tight">Quảng Trị</span>
          <nav className="hidden items-center gap-8 text-sm md:flex" style={{ color: BROWN }}>
            <a href="#dishes" className="hover:text-[var(--ink)]" style={{ "--ink": INK } as React.CSSProperties}>
              {t(lang, copy.nav.dishes)}
            </a>
            <a href="#gifts" className="hover:text-[var(--ink)]" style={{ "--ink": INK } as React.CSSProperties}>
              {t(lang, copy.nav.gifts)}
            </a>
            <a href="#map" className="hover:text-[var(--ink)]" style={{ "--ink": INK } as React.CSSProperties}>
              {t(lang, copy.nav.map)}
            </a>
          </nav>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      {/* Hero: single column masthead-stack, no split header */}
      <section className="mx-auto max-w-[1400px] px-6 pt-12 pb-10 md:px-12 md:pt-20">
        <h1 className="font-heading max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          {t(lang, copy.hero.headline)}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: BROWN }}>
          {t(lang, copy.hero.subhead)}
        </p>
      </section>

      {/* Stat rule: dense by-the-numbers strip, sets the section rhythm device (rule above every section) */}
      <section className="border-y" style={{ borderColor: RULE }}>
        <div className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x px-6 md:px-12" style={{ borderColor: RULE }}>
          {stats.map((s) => (
            <div key={t(lang, s.label)} className="px-4 py-6 text-center first:pl-0 last:pr-0 md:px-8">
              <span className="font-heading text-3xl md:text-4xl" style={{ color: CHILI }}>
                {s.value}
              </span>
              <span className="mt-1 block text-xs md:text-sm" style={{ color: BROWN }}>
                {t(lang, s.label)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured dish: magazine spread, gutter rule, drop cap, pull quote */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        <SectionHead eyebrow={t(lang, copy.sections.featured)} title={t(lang, featured.name)} />
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-0">
          <div className="md:col-span-6">
            <img
              src={`https://picsum.photos/seed/${featured.id}/1100/1300`}
              alt={t(lang, featured.name)}
              className="aspect-[4/5] w-full rounded-sm object-cover"
              loading="eager"
            />
          </div>
          <div
            className="md:col-span-6 md:border-l md:pl-12"
            style={{ borderColor: RULE }}
          >
            <DropCapParagraph text={t(lang, featured.desc)} color={BROWN} />
            {featured.tag && (
              <blockquote
                className="mt-8 border-l-2 pl-4 text-lg leading-snug"
                style={{ borderColor: CHILI, color: INK }}
              >
                {t(lang, featured.tag)}
              </blockquote>
            )}
            <span
              className="mt-6 inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: MOSS }}
            >
              {featured.village}
            </span>
          </div>
        </div>
      </section>

      {/* Dish grid: structured magazine grid, one lead cell, dense metadata */}
      <section id="dishes" className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        <SectionHead title={t(lang, copy.sections.dishes)} />
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {gridDishes.map((dish, i) => {
            const lead = i === 0;
            return (
              <Reveal
                key={dish.id}
                delay={(i % 4) * 60}
                className={lead ? "col-span-2 row-span-2" : "col-span-1"}
              >
                <img
                  src={`https://picsum.photos/seed/${dish.id}/${lead ? 900 : 480}/${lead ? 900 : 480}`}
                  alt={t(lang, dish.name)}
                  className={`w-full rounded-sm object-cover ${lead ? "aspect-square" : "aspect-[4/3]"}`}
                  loading="lazy"
                />
                <span className="mt-3 block text-xs font-medium" style={{ color: MOSS }}>
                  {dish.village}
                </span>
                <h3 className={`font-heading mt-1 leading-snug ${lead ? "text-2xl" : "text-base"}`}>
                  {t(lang, dish.name)}
                </h3>
                <p
                  className={`mt-2 leading-relaxed ${lead ? "text-sm" : "text-xs"} ${
                    lead ? "line-clamp-3" : "line-clamp-2"
                  }`}
                  style={{ color: BROWN }}
                >
                  {t(lang, dish.desc)}
                </p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Gifts: dense informational grid, no photos, row-rule only at row break */}
      <section id="gifts" className="py-16 md:py-24" style={{ backgroundColor: SAND_DEEP }}>
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <SectionHead title={t(lang, copy.sections.gifts)} />
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-3">
            {gifts.map((gift, i) => (
              <Reveal
                key={t(lang, gift.name)}
                delay={(i % 3) * 60}
                className={i >= 3 ? "border-t pt-8 sm:pt-10" : ""}
              >
                <div style={i >= 3 ? { borderColor: RULE } : undefined} className="contents">
                  <h3 className="font-heading text-xl leading-snug">{t(lang, gift.name)}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: BROWN }}>
                    {t(lang, gift.desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craft map: map + legend split, distinct from the featured spread */}
      <section id="map" className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
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

      <footer className="border-t px-6 py-10 md:px-12" style={{ borderColor: RULE }}>
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

export default function PreviewCPage() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}

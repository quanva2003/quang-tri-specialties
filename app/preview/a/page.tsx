"use client";

import { Suspense } from "react";
import { useLang, type Lang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { dishes } from "@/content/dishes";
import { gifts } from "@/content/gifts";
import type { Bilingual } from "@/content/types";

const INK = "#2B2018";
const BROWN = "#6B4F33";
const MOSS = "#5C6B4E";
const CHILI = "#9C3B2C";
const SAND = "#F1E8D6";
const SAND_DEEP = "#E7D9BC";

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

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      {(["vi", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 transition-colors ${
            lang === l ? "text-[var(--chili)] font-semibold" : "text-[var(--brown)] hover:text-[var(--ink)]"
          }`}
          style={{ "--chili": CHILI, "--brown": BROWN, "--ink": INK } as React.CSSProperties}
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

  return (
    <div className="min-h-dvh" style={{ backgroundColor: SAND, color: INK }}>
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <span className="font-heading text-lg tracking-tight">Quảng Trị</span>
        <LangToggle lang={lang} setLang={setLang} />
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pt-10 pb-16 md:px-12 md:pt-16">
        <h1 className="font-heading max-w-3xl text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
          {t(lang, copy.hero.headline)}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: BROWN }}>
          {t(lang, copy.hero.subhead)}
        </p>
      </section>

      <div className="mx-6 overflow-hidden rounded-sm md:mx-12">
        <img
          src="https://picsum.photos/seed/quang-tri-mien-trung-gio/1600/700"
          alt=""
          className="h-[36vh] w-full object-cover md:h-[48vh]"
          loading="eager"
        />
      </div>

      {/* Featured dish */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:gap-12 md:px-12 md:py-28">
        <div className="order-2 md:order-1 md:col-span-7 md:flex md:flex-col md:justify-center">
          <span
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: MOSS }}
          >
            {t(lang, copy.sections.featured)}
          </span>
          <h2 className="font-heading mt-4 text-3xl leading-tight md:text-4xl">
            {t(lang, featured.name)}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed md:text-lg" style={{ color: BROWN }}>
            {t(lang, featured.desc)}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: MOSS }}
            >
              {featured.village}
            </span>
            {featured.tag && (
              <span className="text-xs" style={{ color: BROWN }}>
                {t(lang, featured.tag)}
              </span>
            )}
          </div>
        </div>
        <div className="order-1 md:order-2 md:col-span-5">
          <img
            src={`https://picsum.photos/seed/${featured.id}/900/1100`}
            alt={t(lang, featured.name)}
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />
        </div>
      </section>

      {/* Dish grid */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <h2 className="font-heading text-3xl leading-tight md:text-4xl">{t(lang, copy.sections.dishes)}</h2>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {dishes.map((dish) => (
            <div key={dish.id}>
              <img
                src={`https://picsum.photos/seed/${dish.id}/640/480`}
                alt={t(lang, dish.name)}
                className="aspect-[4/3] w-full rounded-sm object-cover"
                loading="lazy"
              />
              <span className="mt-3 block text-xs font-medium" style={{ color: MOSS }}>
                {dish.village}
              </span>
              <h3 className="font-heading mt-1 text-lg leading-snug">{t(lang, dish.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed line-clamp-2" style={{ color: BROWN }}>
                {t(lang, dish.desc)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gifts */}
      <section className="px-6 py-20 md:px-12 md:py-28" style={{ backgroundColor: SAND_DEEP }}>
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-heading text-3xl leading-tight md:text-4xl">{t(lang, copy.sections.gifts)}</h2>
          <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {gifts.map((gift, i) => (
              <div
                key={i}
                className="border-t pt-5"
                style={{ borderColor: `${BROWN}33` }}
              >
                <h3 className="font-heading text-xl leading-snug">{t(lang, gift.name)}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: BROWN }}>
                  {t(lang, gift.desc)}
                </p>
              </div>
            ))}
          </div>
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
                  <text
                    x={v.x + 12}
                    y={v.y + 4}
                    className="font-heading"
                    fontSize="13"
                    fill={INK}
                  >
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

export default function PreviewAPage() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}

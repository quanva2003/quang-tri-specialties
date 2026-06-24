"use client";

import { useState } from "react";
import type { Lang } from "@/lib/useLang";
import { t, BROWN, MOSS, CHILI, INK, SAND, RULE } from "@/lib/theme";
import { copy } from "@/content/copy";
import { dishes } from "@/content/dishes";

type Village = { id: string; name: string; x: number; y: number; matches: string[] };

const villages: Village[] = [
  { id: "mai-xa", name: "Mai Xá", x: 250, y: 90, matches: ["Mai Xá"] },
  { id: "dong-ha", name: "Đông Hà", x: 220, y: 200, matches: ["Đông Hà"] },
  { id: "cho-sai", name: "Chợ Sãi", x: 250, y: 250, matches: ["Chợ Sãi"] },
  { id: "huong-hoa", name: "Hướng Hóa (Khe Sanh)", x: 35, y: 352, matches: ["Hướng Hóa"] },
  { id: "my-chanh", name: "Mỹ Chánh", x: 230, y: 320, matches: ["Mỹ Chánh"] },
  { id: "phuong-lang", name: "Phương Lang", x: 210, y: 370, matches: ["Phương Lang"] },
  { id: "bau-tram", name: "Bàu Tràm", x: 185, y: 410, matches: ["Bàu Tràm"] },
  { id: "hai-lang", name: "Hải Lăng", x: 205, y: 460, matches: ["Hải Lăng"] },
];

// Stylized silhouette: narrow coastal strip in the north/south, bulging west
// at mid-latitude for the Hướng Hóa highlands that reach toward the Laos border.
const PROVINCE_OUTLINE =
  "M 240 30 L 265 50 L 280 80 L 270 105 L 285 125 L 295 155 L 280 185 " +
  "L 300 210 L 290 240 L 275 270 L 280 300 L 260 330 L 265 360 L 245 390 " +
  "L 250 420 L 225 450 L 230 480 L 200 510 L 170 495 L 150 470 L 135 440 " +
  "L 140 410 L 120 390 L 90 380 L 55 370 L 20 360 L 50 335 L 75 320 L 95 300 " +
  "L 80 270 L 60 240 L 75 210 L 60 180 L 80 150 L 70 120 L 95 95 L 120 70 " +
  "L 150 50 L 185 35 Z";

function SectionHead({ title }: { title: string }) {
  return (
    <div className="border-t pt-5" style={{ borderColor: RULE }}>
      <h2 className="font-heading mt-2 text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

export function CraftMap({ lang }: { lang: Lang }) {
  // Hover previews a village; click pins it so the detail panel stays put
  // once the cursor moves away. Kept as separate state so a click's toggle
  // never fights the mouseenter that necessarily fires right before it.
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const activeId = pinnedId ?? hoveredId;
  const active = villages.find((v) => v.id === activeId) ?? null;
  const activeDishes = active ? dishes.filter((d) => active.matches.includes(d.village)) : [];

  return (
    <section id="map" className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-20 md:px-12 md:py-28">
      <SectionHead title={t(lang, copy.sections.craftMap)} />
      <p className="mt-4 max-w-md text-sm" style={{ color: BROWN }}>
        {t(lang, copy.sections.craftMapNote)}
      </p>
      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <svg
            viewBox="0 0 400 600"
            className="h-[440px] w-full max-w-sm md:mx-auto"
            role="img"
            aria-label={t(lang, copy.sections.craftMap)}
          >
            <path d={PROVINCE_OUTLINE} fill={`${BROWN}14`} stroke={BROWN} strokeWidth="2" strokeLinecap="round" />
            {villages.map((v) => {
              const isActive = v.id === activeId;
              return (
                <g
                  key={v.id}
                  onMouseEnter={() => setHoveredId(v.id)}
                  onMouseLeave={() => setHoveredId((cur) => (cur === v.id ? null : cur))}
                  onClick={() => setPinnedId((cur) => (cur === v.id ? null : v.id))}
                  className="cursor-pointer"
                >
                  <circle
                    cx={v.x}
                    cy={v.y}
                    r={isActive ? 7 : 5}
                    fill={isActive ? CHILI : MOSS}
                    className="transition-all duration-200"
                  />
                  <text
                    x={v.x + 12}
                    y={v.y + 4}
                    className="font-heading transition-colors duration-200"
                    fontSize="13"
                    fill={isActive ? CHILI : INK}
                    fontWeight={isActive ? 600 : 400}
                  >
                    {v.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="md:col-span-5 md:border-l md:pl-12" style={{ borderColor: RULE }}>
          <span className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: MOSS }}>
            {t(lang, copy.sections.villages)}
          </span>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            {villages.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHoveredId(v.id)}
                  onMouseLeave={() => setHoveredId((cur) => (cur === v.id ? null : cur))}
                  onClick={() => setPinnedId((cur) => (cur === v.id ? null : v.id))}
                  className="text-left transition-colors"
                  style={{ color: v.id === activeId ? CHILI : BROWN }}
                >
                  {v.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 min-h-[88px] rounded-xl p-4" style={{ backgroundColor: `${SAND}`, border: `1px solid ${RULE}` }}>
            {active ? (
              <>
                <p className="font-heading text-sm" style={{ color: CHILI }}>
                  {active.name}
                </p>
                <ul className="mt-2 space-y-1 text-sm" style={{ color: INK }}>
                  {activeDishes.map((d) => (
                    <li key={d.id}>{t(lang, d.name)}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm" style={{ color: BROWN }}>
                {t(lang, copy.sections.craftMapHint)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

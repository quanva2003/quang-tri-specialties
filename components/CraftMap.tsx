import type { Lang } from "@/lib/useLang";
import { t, BROWN, MOSS, CHILI, INK, RULE } from "@/lib/theme";
import { copy } from "@/content/copy";

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

function SectionHead({ title }: { title: string }) {
  return (
    <div className="border-t pt-5" style={{ borderColor: RULE }}>
      <h2 className="font-heading mt-2 text-3xl leading-tight md:text-4xl">{title}</h2>
    </div>
  );
}

export function CraftMap({ lang }: { lang: Lang }) {
  return (
    <section id="map" className="mx-auto max-w-[1400px] scroll-mt-24 px-6 py-16 md:px-12 md:py-24">
      <SectionHead title={t(lang, copy.sections.craftMap)} />
      <p className="mt-4 max-w-md text-sm" style={{ color: BROWN }}>
        {t(lang, copy.sections.craftMapNote)}
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
            {t(lang, copy.sections.villages)}
          </span>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm" style={{ color: BROWN }}>
            {villages.map((v) => (
              <li key={v.name}>{v.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

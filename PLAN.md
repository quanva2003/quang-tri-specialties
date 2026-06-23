# PLAN — Đặc Sản Quảng Trị (bilingual single-page)

> Single-page landing tôn vinh các món đặc sản Quảng Trị (quê hương). Song ngữ VI/EN.
> Build với Claude Code. Mỗi phase có prompt paste-ready + QA gate.

---

## PROJECT CONTEXT (mọi prompt phía dưới đều reference block này)

**Stack**

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- `next/font` (Google) với subset `vietnamese` — bắt buộc
- `next/image` cho ảnh món
- Deploy: Vercel (SSG)

**Scope**

- Single page, không cần i18n routing (`/vi` `/en`). Song ngữ bằng React state + URL query `?lang=` (default `vi`).
- Data-driven: các món render từ array, không hardcode markup.

**Mood / design direction** (đây là phần feed cho brief inference của các design skill)

- Nắng gió miền Trung, hoài niệm, mộc mạc nhưng _expensive-looking_. Editorial / magazine, KHÔNG phải brochure du lịch lòe loẹt.
- Angle storytelling: người Quảng Trị xa quê nhớ hương vị quê nhà.

**Palette** (chỉ định rõ để skill không tự chế gradient slop)

- Nền: tông đất — nâu lá chuối khô, vàng cát.
- Phụ: xanh rêu nhạt.
- Accent: đỏ ớt (dùng tiết chế, chỉ cho điểm nhấn).
- Tránh: gradient tím/xanh neon, kiểu SaaS generic.

**Typography**

- Heading: serif có cá tính (Playfair Display) — PHẢI có subset `vietnamese`.
- Body: sans gọn (Be Vietnam Pro).
- Lý do nhấn mạnh subset: font thiếu glyph tiếng Việt → dấu vỡ. Bất kỳ font nào skill đề xuất đều phải hỗ trợ Vietnamese.

**Cấu trúc section (single page)**

1. Hero — câu hook về quê hương + lang toggle
2. Featured dish — bún hến Mai Xá (món mạnh nhất về story)
3. Dish grid — ~12 món, data-driven
4. Gift section — đặc sản mua về làm quà (cà phê Khe Sanh, cao chè vằng…)
5. Craft map — bản đồ SVG Quảng Trị đánh dấu các làng nghề
6. Footer

**Skills sử dụng**

- `design-taste-frontend` (taste-skill v2) — driver chính: Phase 2 lo direction (chạy 2–3 lần lấy variants), Phase 6 lo polish pass cuối. Đây là skill cần test.
- `imagegen-frontend-web` (taste-skill) — gen ảnh reference cho món
- `/qa` (gstack) — chạy sau MỖI phase làm gate
- (đã bỏ `design-shotgun`: nó là skill gstack, không thuộc taste-skill. Mục tiêu là test taste-skill nên không mượn skill khác lo layout — để chính §0 của taste-skill tự infer hướng, đó là phần đáng test nhất.)

**Quy ước kỹ thuật**

- Atomic commits, read-before-write, không thêm dependency mới nếu không cần (đúng workflow quen thuộc).
- Mỗi phase chỉ merge khi `/qa` pass.

> ⚠️ Cú pháp gọi `/qa` (gstack) bên dưới viết theo cách thông dụng — chỉnh lại cho khớp đúng setup gstack trên máy nếu khác.

---

## PHASE 0 — Setup & scaffold

**Mục tiêu:** dựng project Next.js, cài skills, tạo cây thư mục.

```bash
npx create-next-app@latest qt-dac-san --typescript --tailwind --app --eslint
cd qt-dac-san
npx skills add Leonxlnx/taste-skill
```

**Prompt (Claude Code):**

```
Project context: building a bilingual (VI/EN) single-page Next.js 15 (App Router) +
TypeScript + Tailwind landing page celebrating the regional specialties of Quảng Trị,
Vietnam. SSG, deploy on Vercel. No i18n routing — language is React state synced to a
?lang= URL query, default "vi".

Task — scaffold only, no styling yet:
1. Verify the create-next-app project is set up correctly (App Router, TS, Tailwind).
2. Create this folder structure with empty placeholder files:
   /content/dishes.ts
   /content/gifts.ts
   /content/copy.ts
   /lib/useLang.ts
   /components/  (Hero, FeaturedDish, DishGrid, GiftSection, CraftMap, Footer, LangToggle)
   /public/dishes/   (empty, for generated images later)
3. Set <html lang="vi"> in the root layout.
4. Add a /content/types.ts exporting a `Bilingual = { vi: string; en: string }` type.
Do not write component styling or content yet. Keep it minimal and committable.
```

**QA gate:**

```
/qa — scope: verify project builds (npm run dev with no errors), folder structure matches
the plan, TypeScript has no errors, no unused imports. Report anything off before I continue.
```

---

## PHASE 1 — Content layer

**Mục tiêu:** đổ data thật (đã research), UI strings song ngữ, hook đọc ngôn ngữ.

**Prompt (Claude Code):**

```
Project context: same Quảng Trị bilingual single-page site. Content is data-driven and
bilingual; components read dish.name[lang] etc. Type Bilingual = { vi: string; en: string }.

Task — build the content layer exactly as below. Do not invent dishes; use this verified data.

1) /content/dishes.ts — export `dishes` array, each item:
   { id, image (path under /dishes/), village, name: Bilingual, desc: Bilingual, tag?: Bilingual }

   Use these 12 dishes (translate/refine EN naturally, keep Vietnamese names authentic):
   - bun-hen-mai-xa | Mai Xá | "Bún hến Mai Xá" | soul of the dish is the chắt chắt
     (a small freshwater clam from the Cánh Hòm river) | tag: Top 100 VN Cuisine
   - banh-bot-loc-my-chanh | Mỹ Chánh | "Bánh bột lọc Mỹ Chánh" | cassava-starch dumplings
     with shrimp & pork, wrapped in banana leaf (not dong leaf) — a local hallmark
   - chao-vat-giuong | (Quảng Trị) | "Cháo vạt giường" | fish (snakehead) congee with long
     rice-flour noodle strips shaped like bed slats
   - thit-trau-la-trong | Hướng Hóa | "Thịt trâu lá trơng" | buffalo meat with lá trơng leaf,
     a mountain-region specialty
   - banh-khoai | Đông Hà | "Bánh khoái Quảng Trị" | small crispy savory pancake; the soul is
     a rich sauce made from ruốc, liver and minced pork
   - mit-thau | Đông Hà | "Mít thấu" | young jackfruit salad with pork, pork skin, peanuts
   - nem-lui-cho-sai | Chợ Sãi | "Nem lụi chợ Sãi" | grilled pork skewers with a thick
     peanut-pork dipping sauce, rolled with herbs and rice paper
   - goi-tep-nhay | Bàu Trạng | "Gỏi tép nhảy" | live river-shrimp salad dressed with lime
   - canh-am-lang-lam | Hải Lăng | "Canh ám làng Lam" | snakehead fish soup with rau sôông
   - banh-uot-phuong-lang | Phương Lang | "Bánh ướt Phương Lang" | soft steamed rice rolls
     with pork and a distinctive dipping fish sauce
   - bap-ham | (Quảng Trị) | "Bắp hầm" | white sticky corn stewed with mung bean
   - banh-it-la-gai | (Quảng Trị) | "Bánh ít lá gai" | lá-gai leaf cake with mung-bean filling,
     traditional for festivals and Tết

2) /content/gifts.ts — export `gifts` array (name: Bilingual, desc: Bilingual):
   - Cà phê Khe Sanh (grown 1,000–1,500m on red basalt soil)
   - Cao chè vằng Cam Lộ (herbal extract)
   - Rượu Kim Long (rice wine)
   - Hồ tiêu Vĩnh Linh (pepper, prized red peppercorns)
   - Ớt dầm Câu Nhi (pickled chili)

3) /content/copy.ts — export `copy` object with bilingual UI strings: nav, hero headline +
   subhead (evoke homesickness/"hương vị quê nhà"), section titles (Featured, Dishes, Gifts,
   Craft Map), footer. Each value is Bilingual.

4) /lib/useLang.ts — hook returning current lang ("vi" | "en") read from ?lang= query
   (default "vi") + a setter that updates the query without full reload. Also update
   document.documentElement.lang on change for a11y.

5) Root layout font setup (do this now so Phase 2 preview routes render Vietnamese correctly):
   wire next/font in app/layout.tsx with the vietnamese subset —
     Playfair_Display({ subsets: ['vietnamese','latin'] })   // headings
     Be_Vietnam_Pro({ subsets: ['vietnamese','latin'], weight:['400','500','600'] })  // body
   Expose them via CSS variables / className on <html> or <body> so any page (incl. /preview/*)
   inherits the correct fonts. No other styling.

Keep it clean and typed. No component work this phase.
```

**QA gate:**

```
/qa — scope: type-check content files, confirm all 12 dishes + 5 gifts present with both vi/en
filled (no empty strings), useLang reads ?lang correctly and defaults to vi, fonts load with the
vietnamese subset (diacritics render). Flag any missing translations or type mismatches.
```

---

## PHASE 2 — Direction pass (design-taste-frontend → 2–3 variants)

**Mục tiêu:** dùng chính `design-taste-frontend` (taste-skill v2) đẻ ra 2–3 direction để chọn 1 làm blueprint. Làm TRƯỚC khi gen ảnh để biết cần ảnh ở đâu, ratio gì. Đây cũng là lần đầu thấy taste-skill produce gì → để §0 tự infer hướng, đừng "mớm" layout sẵn.

> Cách lấy variety mà vẫn test đúng taste-skill: chạy prompt 2–3 lần, mỗi lần đổi nhẹ **emphasis** (xem 3 biến thể bên dưới), rồi so và chọn. KHÔNG mượn skill ngoài lo layout.

**Cách preview:** mỗi variant được ghi vào một **preview route tạm** trong Next, xem trên localhost. Đây là môi trường thật (next/font subset vietnamese + data thật từ /content) nên dấu tiếng Việt và layout sát sản phẩm cuối. Là route rác — Phase 4 refactor xong sẽ xóa cả `app/preview/`.

> ⚠️ Điều kiện để preview hiển thị đúng dấu: `next/font` với subset `vietnamese` phải được khai ở **root layout** từ trước (lý tưởng làm sớm cuối Phase 1). Nếu chưa, preview vẫn chạy nhưng dấu có thể chưa chuẩn.

```bash
npm run dev
# rồi mở:
#   localhost:3000/preview/a
#   localhost:3000/preview/b
#   localhost:3000/preview/c
```

**Prompt — Variant A (editorial tĩnh, nhiều whitespace):**

```
Use the design-taste-frontend skill to produce a layout direction for this single-page site.
Let your §0 inference drive the design — do not just apply a template.

Project context: bilingual (VI/EN) single-page landing celebrating the regional food specialties
of Quảng Trị, central Vietnam. Emotional angle: people far from home longing for the taste of
their hometown. Mood: central-Vietnam sun-and-wind, nostalgic, rustic yet expensive-looking.
Palette: earth tones (dried-banana-leaf brown, sand yellow), muted moss green, restrained
chili-red accent — no neon/purple SaaS gradients. Type: Playfair Display headings + Be Vietnam
Pro body, both with the Vietnamese subset (any font you pick MUST support Vietnamese glyphs).

Sections: (1) Hero with hook + lang toggle, (2) Featured dish = bún hến Mai Xá, (3) Dish grid of
12 items, (4) Gifts section, (5) SVG craft map placeholder, (6) Footer. Content lives in /content
and is data-driven. Bilingual text length differs (EN usually longer) — the layout must tolerate
both without breaking.

This variant's emphasis: editorial / magazine restraint, generous whitespace, type-led, quiet.

Output: write this variant as a self-contained Next.js page at app/preview/a/page.tsx (use the
real fonts via next/font and real data from /content where practical, not lorem ipsum), so I can
preview it at localhost:3000/preview/a. This is a throwaway preview route — keep it isolated;
I'll refactor the chosen direction into proper data-driven components later. Briefly explain the
key layout choices after.
```

**Variant B** — same prompt, đổi câu emphasis + đổi path `a` → `b`:

```
This variant's emphasis: large emotive imagery, immersive hero, photography-led storytelling.
...
Output: write this variant at app/preview/b/page.tsx, preview at localhost:3000/preview/b.
```

**Variant C** — same prompt, đổi câu emphasis + đổi path `a` → `c`:

```
This variant's emphasis: structured magazine grid, strong section rhythm, denser information.
...
Output: write this variant at app/preview/c/page.tsx, preview at localhost:3000/preview/c.
```

→ `npm run dev`, mở 3 tab, so 3 variant. Reply chọn 1 làm blueprint (vd: "go with Variant A, but pull the immersive hero from B"). Variant đã chọn = reference cho Phase 3 (ảnh) và Phase 4 (skeleton). **`app/preview/` sẽ bị xóa ở Phase 4** — đừng để nó lọt lên Vercel.

**QA gate:**

```
/qa — scope: sanity-check the generated directions against the brief (mood, palette, bilingual
tolerance, all 6 sections present, Vietnamese-capable fonts render diacritics correctly on the
preview routes). Flag any variant that drifts into generic/templated layout or ignores the
editorial/nostalgic mood. Design gate — no code review.
```

---

## PHASE 3 — Image generation (imagegen-frontend-web)

**Mục tiêu:** gen ảnh reference cho các món, khớp với layout đã chọn.

> ⚠️ Món Việt cụ thể dễ bị AI gen sai (ra món Tàu/Thái). Verify từng ảnh; cái nào sai thì để placeholder blur, thay ảnh thật sau.

**Prompt (Claude Code):**

```
Use the imagegen-frontend-web skill to generate reference imagery for this site, matching the
layout direction chosen in Phase 2.

Project context: editorial Quảng Trị food landing, earth-tone palette (banana-leaf brown, sand,
muted moss, chili-red accent), nostalgic central-Vietnam mood, natural/warm lighting, rustic
plating on simple ceramics or banana leaf — NOT glossy studio food-ad style.

Generate:
- 1 hero image (atmospheric, central-Vietnam food/landscape feel, room for overlaid text)
- 1 strong featured image for bún hến Mai Xá (noodle soup with small clams, herbs, broth)
- grid images for the other dishes in /content/dishes.ts, named to match each dish `image` path

IMPORTANT: these are specific Vietnamese dishes. For each, anchor the prompt to the real dish
(ingredients, plating) so it doesn't drift into generic Asian food. After generating, show me
each image so I can flag any that look wrong — those I'll replace with real photos later; wire a
blurred color placeholder for them so layout never breaks. Set explicit width/height (or fixed
aspect-ratio) on every image to prevent CLS.
```

**QA gate:**

```
/qa — scope: confirm every dish/gift has either a generated image or a placeholder (no broken
paths), all images have explicit dimensions/aspect-ratio, file naming matches the `image` fields
in dishes.ts. Flag any image that visibly misrepresents its dish.
```

---

## PHASE 4 — Skeleton build (implement chosen layout)

**Mục tiêu:** code thật các section theo direction đã chọn, data-driven, gắn ảnh + lang toggle. Structure trước, polish để dành Phase 6.

**Prompt (Claude Code):**

```
Project context: implement the Phase 2 chosen layout as real components for the Quảng Trị
bilingual single-page site. Data is in /content (dishes, gifts, copy); language via useLang
(?lang=, default vi). next/font (Playfair Display + Be Vietnam Pro, vietnamese subset) is already
wired in the root layout from Phase 1 — reuse it, don't re-declare. Build structure &
responsiveness; leave fine visual polish for the taste-skill pass later.

First, port the chosen Phase 2 preview (app/preview/<x>/page.tsx) into proper data-driven
components — then DELETE the entire app/preview/ folder so no throwaway routes ship to Vercel.

Build these components, all reading text as field[lang]:
- LangToggle — switches vi/en via useLang
- Hero — copy.hero + toggle + hero image
- FeaturedDish — bún hến Mai Xá, emphasized per chosen direction
- DishGrid — maps over dishes, next/image with fixed aspect-ratio, village + name + desc + tag
- GiftSection — maps over gifts
- CraftMap — placeholder block for now (SVG comes in Phase 5)
- Footer — copy.footer

Requirements:
- Test BOTH languages: EN strings are often longer — no overflow/broken headings on mobile.
- No layout shift on language switch.
- Semantic HTML, alt text from dish names, no <form> tags.
- Minimal Tailwind for structure only; do not over-style — taste-skill refines later.
- app/preview/ must be gone after this phase.
```

**QA gate:**

```
/qa — scope: build passes; app/preview/ is deleted (no leftover preview routes); both vi and en
render with no overflow/CLS on mobile + desktop; images use fixed aspect-ratio; lang toggle
updates content AND document.documentElement.lang; Vietnamese diacritics render correctly
(font subset working); a11y alt text present.
```

---

## PHASE 5 — Craft map (SVG)

**Mục tiêu:** bản đồ SVG tĩnh Quảng Trị đánh dấu các làng nghề. Editorial, KHÔNG embed Google Maps, không kéo thư viện map.

**Prompt (Claude Code):**

```
Project context: build the CraftMap section for the Quảng Trị food site. Editorial illustration,
not a real interactive map — do NOT use Google Maps or any map library. A hand-drawn-feeling
static SVG fits the nostalgic/rustic mood.

Task:
- Create a static SVG outline of Quảng Trị province (a stylized/editorial silhouette is fine —
  it's illustrative, not cartographically exact).
- Place labeled pins (<circle> + label) at the craft villages referenced by the dishes:
  Mai Xá, Mỹ Chánh, Phương Lang, Chợ Sãi, Bàu Trạng, Hải Lăng, Đông Hà, Hướng Hóa (Khe Sanh).
- Pin labels bilingual via useLang where there's a translatable descriptor.
- Style with the earth-tone palette; chili-red accent for active/hover pin.
- Lightweight: inline SVG, no external assets. On hover/tap a pin, optionally surface the
  dish(es) from that village (nice-to-have, keep simple).
- Responsive: scales cleanly down to mobile without label collisions.
```

**QA gate:**

```
/qa — scope: SVG renders crisp at all sizes, no label overlap on mobile, no map library was
pulled in, pins match village names used in dishes.ts, palette consistent, works in both langs.
```

---

## PHASE 6 — Taste Skill styling pass

**Mục tiêu:** giao cho taste-skill v2 (`design-taste-frontend`) tinh chỉnh toàn bộ visual system trên bản build thật — typography scale, spacing, palette execution, motion, responsive polish.

> Khác Phase 2 thế nào: Phase 2 chạy taste-skill ở mức _direction/blueprint_ (chọn hướng, chưa có code thật). Phase 6 chạy lại trên _implementation thật_ (skeleton data-driven + ảnh + SVG đã build) để ra bản production. Chạy taste-skill 2 lần ở 2 mức khác nhau là cố ý — và cũng cho bạn thấy rõ hơn năng lực skill (đúng mục tiêu test). Lệnh bảo nó **refine, không rebuild**, để giữ structure/bilingual/SVG.

**Prompt (Claude Code):**

```
Use the taste-skill (design-taste-frontend, v2) to do a full visual polish pass on the existing
Quảng Trị single-page site. The structure, content, images and SVG map are already built — refine,
don't rebuild.

Brief for inference:
- Subject: regional food specialties of Quảng Trị, central Vietnam. An ode to home cuisine; the
  emotional angle is people far from home longing for the taste of their hometown.
- Mood: sun-and-wind of central Vietnam, nostalgic, rustic yet expensive-looking. Editorial /
  magazine restraint, generous whitespace — NOT a busy tourism brochure.
- Palette: earth tones (dried-banana-leaf brown, sand yellow), muted moss green; chili-red as a
  restrained accent only. No neon/purple SaaS gradients.
- Type: Playfair Display (headings) + Be Vietnam Pro (body), both already loaded with the
  vietnamese subset — any further font choice MUST support Vietnamese glyphs.
- Motion: subtle, slow scroll-reveals that suit the calm/nostalgic tone. Restraint over flash.

Apply: typographic scale & hierarchy, spacing rhythm, color execution, tasteful motion,
dark-mode parity if the skill adds it, and responsive refinement. Preserve the data-driven
structure, the bilingual logic (useLang/?lang), the SVG map, and image aspect-ratios. Run the
skill's pre-flight check before finishing.
```

**QA gate:**

```
/qa — scope: visual review against the brief (mood, palette, editorial restraint); confirm
bilingual logic, SVG map, and image dimensions survived the pass; no CLS; mobile + desktop;
Vietnamese diacritics still correct; motion is subtle not flashy. Flag any drift toward
generic/templated styling.
```

---

## PHASE 7 — Polish & deploy

**Mục tiêu:** kiểm tra cuối, SEO/metadata, deploy Vercel.

**Prompt (Claude Code):**

```
Project context: final pass + deploy for the Quảng Trị bilingual single-page site.

Tasks:
1. Metadata: set title/description (Vietnamese default), Open Graph image (use the hero image),
   theme-color matching the palette. <html lang> follows current language.
2. Performance: run a quick audit — image sizes/formats (webp), no unused JS, Lighthouse-style
   checks. Fix obvious wins.
3. Final bilingual QA: walk every section in BOTH vi and en on mobile + desktop; fix any overflow,
   CLS, or untranslated string.
4. README.md: short note on stack, how lang toggle works, and which images are AI-generated
   placeholders still needing real photos.
5. Prep for Vercel deploy (build passes clean, env-free).
```

**QA gate (final):**

```
/qa — full scope: production build clean, both languages complete, metadata + OG set,
no CLS/overflow, diacritics correct, images optimized, README present. Green-light for deploy.
```

---

## Reminders

- Commit atomically per phase; only advance when `/qa` is green.
- Images from Phase 3 are placeholders where AI got the dish wrong — track those in README to swap with real photos.
- `/qa` (gstack) invocation syntax: adjust to match your local setup.
- `design-taste-frontend` is the skill under test — it drives both Phase 2 (direction) and Phase 6 (polish). Don't outsource layout to another skill, or you won't know what taste-skill alone produces.
- Keep the brief mood-rich every time taste-skill runs — that's what makes §0 infer the editorial direction instead of defaulting to slop.

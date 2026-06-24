# Quảng Trị Đặc Sản

A bilingual (Vietnamese / English) single-page landing site celebrating the dishes,
gifts, and craft villages of Quảng Trị.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19
- **Tailwind CSS 4**
- **TypeScript**
- Images served through `next/image` (automatic resizing + webp/avif negotiation via `sharp`)
- No backend, no database, no environment variables — fully static/SSG-friendly

## Language toggle

There's no i18n library. Language is tracked via a `?lang=` query param:

- `lib/useLang.ts` reads `?lang=en` from the URL (anything else defaults to `"vi"`) and
  syncs `document.documentElement.lang` on the client.
- `LangToggle` calls `setLang()`, which updates the query param via `router.replace`.
- All copy lives in `content/copy.ts` (site strings) and `content/dishes.ts` /
  `content/gifts.ts` (per-item bilingual data), each entry shaped as `{ vi, en }`.
- Components read strings with the `t(lang, bilingual)` helper from `lib/theme.ts`.

To add a new bilingual string: add a `{ vi, en }` entry to `content/copy.ts` and call
`t(lang, copy.yourKey)` wherever it's needed.

## Images — AI-generated placeholders

Every photo currently in `public/` (`hero/`, `dishes/`, `gifts/`) is an AI-generated
placeholder, not a real photograph. All of them need to be replaced with real photos
before this ships publicly:

- `public/hero/quang-tri-hero.jpg` — hero banner
- `public/dishes/*.jpg` — 12 dish photos
- `public/gifts/*.jpg` — 5 gift/specialty photos

## Development

```bash
npm run dev     # start dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Deploy

No environment variables are required. Push to a Git remote and import the repo on
Vercel — `npm run build` is the build command, no extra config needed.

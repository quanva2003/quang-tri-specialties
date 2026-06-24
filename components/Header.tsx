"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import type { Lang } from "@/lib/useLang";
import { t } from "@/lib/theme";
import { copy } from "@/content/copy";
import type { Bilingual } from "@/content/types";
import { LangToggle } from "./LangToggle";

const navItems: { id: string; label: Bilingual }[] = [
  { id: "hero", label: copy.nav.home },
  { id: "featured", label: copy.nav.featured },
  { id: "dishes", label: copy.nav.dishes },
  { id: "gifts", label: copy.nav.gifts },
  { id: "map", label: copy.nav.map },
];

export function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
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

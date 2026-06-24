"use client";

import { Suspense } from "react";
import { useLang } from "@/lib/useLang";
import { SAND, INK } from "@/lib/theme";
import { dishes } from "@/content/dishes";
import { gifts } from "@/content/gifts";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedDish } from "@/components/FeaturedDish";
import { DishGrid } from "@/components/DishGrid";
import { GiftSection } from "@/components/GiftSection";
import { CraftMap } from "@/components/CraftMap";
import { Footer } from "@/components/Footer";

function PageContent() {
  const { lang, setLang } = useLang();
  const featured = dishes[0];
  const restDishes = dishes.slice(1);

  return (
    <div className="min-h-dvh" style={{ backgroundColor: SAND, color: INK }}>
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <FeaturedDish lang={lang} dish={featured} />
      <DishGrid lang={lang} dishes={restDishes} />
      <GiftSection lang={lang} gifts={gifts} />
      <CraftMap lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}

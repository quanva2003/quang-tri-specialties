"use client";

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type Lang = "vi" | "en";

export function useLang() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lang: Lang = searchParams.get("lang") === "en" ? "en" : "vi";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { lang, setLang };
}

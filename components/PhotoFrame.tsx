"use client";

import { useState } from "react";

const PLACEHOLDER_TONES = ["#6B4F33", "#5C6B4E", "#C9B591", "#8C6A45", "#7A8566"];

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
export function PhotoFrame({
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
  // Tailwind's generated stylesheet always orders `.relative` after
  // `.absolute`, so a hardcoded `relative` base class silently wins over an
  // `absolute` passed through frameClassName, collapsing the box to 0 height.
  const positionClass = frameClassName.includes("absolute") ? "" : "relative";

  return (
    <div
      className={`${positionClass} overflow-hidden ${frameClassName}`}
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

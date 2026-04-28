"use client";

import { useMemo } from "react";
import { QUOTES } from "@/lib/utils";

export function QuoteCard() {
  const quote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    []
  );

  return (
    <div
      className="rounded-xl p-[18px]"
      style={{
        background: "rgba(232,201,106,0.08)",
        border: "1px solid rgba(232,201,106,0.15)",
      }}
    >
      <div
        className="font-serif text-[15px] font-light italic leading-relaxed"
        style={{ color: "var(--gold)" }}
      >
        &ldquo;{quote.text}&rdquo;
      </div>
      <div className="text-[11px] mt-2" style={{ color: "var(--gold2)" }}>
        — {quote.author}
      </div>
    </div>
  );
}

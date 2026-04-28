"use client";

import { useMemo } from "react";

const DAYS = 84;

function randomLevel(): number {
  const r = Math.random();
  if (r < 0.15) return 0;
  if (r < 0.35) return 1;
  if (r < 0.6) return 2;
  if (r < 0.8) return 3;
  return 4;
}

const LEVEL_COLORS = [
  "var(--bg4)",
  "rgba(126,200,138,0.25)",
  "rgba(126,200,138,0.5)",
  "rgba(126,200,138,0.75)",
  "#7ec88a",
];

export function ActivityHeatmap() {
  
  const cells = useMemo(
    () => Array.from({ length: DAYS }, (_, i) => ({ id: i, level: randomLevel() })),
    []
  );

  return (
    <div
      className="rounded-xl p-[18px]"
      style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-3.5">
        <div className="text-[15px] font-medium">Activity heatmap</div>
        <div className="text-[11px]" style={{ color: "var(--text3)" }}>
          Last 84 days
        </div>
      </div>
      <div className="flex flex-wrap gap-[3px]">
        {cells.map(({ id, level }) => (
          <div
            key={id}
            className="w-2.5 h-2.5 rounded-[2px]"
            style={{ background: LEVEL_COLORS[level] }}
            title={`Day ${id + 1}`}
          />
        ))}
      </div>
     
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-[10px]" style={{ color: "var(--text3)" }}>Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-[2px]"
            style={{ background: c }}
          />
        ))}
        <span className="text-[10px]" style={{ color: "var(--text3)" }}>More</span>
      </div>
    </div>
  );
}

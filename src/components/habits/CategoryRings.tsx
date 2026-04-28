"use client";

import type { Habit, Category } from "@/types";
import { getCategoryColor } from "@/lib/utils";

interface CategoryRingsProps {
  habits: Habit[];
}

const CATEGORIES: Category[] = ["Mind", "Body", "Focus", "Health"];
const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function CategoryRings({ habits }: CategoryRingsProps) {
  const rings = CATEGORIES.map((cat) => {
    const catHabits = habits.filter((h) => h.category === cat);
    const pct =
      catHabits.length === 0
        ? 0
        : catHabits.filter((h) => h.completedToday).length / catHabits.length;
    return { cat, pct, count: catHabits.length };
  }).filter((r) => r.count > 0);

  if (rings.length === 0) return null;

  return (
    <div
      className="rounded-xl p-[18px]"
      style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
    >
      <div className="text-[15px] font-medium mb-[14px]">Category rings</div>
      <div className="grid grid-cols-2 gap-3">
        {rings.map(({ cat, pct }) => {
          const color = getCategoryColor(cat);
          const offset = CIRCUMFERENCE * (1 - pct);
          return (
            <div key={cat} className="flex flex-col items-center gap-1.5">
              <div className="relative w-16 h-16">
                <svg
                  viewBox="0 0 64 64"
                  className="w-16 h-16"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="32"
                    cy="32"
                    r={RADIUS}
                    fill="none"
                    stroke="var(--bg4)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r={RADIUS}
                    fill="none"
                    stroke={color}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                    style={{ transition: "stroke-dashoffset 0.8s ease" }}
                  />
                </svg>
                <div
                  className="absolute inset-0 flex items-center justify-center font-serif text-[15px] font-light"
                  style={{ color }}
                >
                  {Math.round(pct * 100)}%
                </div>
              </div>
              <div
                className="text-[11px] text-center"
                style={{ color: "var(--text3)" }}
              >
                {cat}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

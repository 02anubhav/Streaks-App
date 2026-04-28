"use client";

import type { Habit } from "@/types";

interface WeeklyViewProps {
  habits: Habit[];
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY_INDEX = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

export function WeeklyView({ habits }: WeeklyViewProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
    >
      
      <div
        className="grid gap-0.5 px-4 py-2.5"
        style={{
          gridTemplateColumns: "1fr repeat(7, 40px)",
          background: "var(--bg3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div />
        {DAY_LABELS.map((d, i) => (
          <div
            key={d}
            className="text-center text-[11px] font-medium tracking-[0.05em]"
            style={{ color: i === TODAY_INDEX ? "var(--gold)" : "var(--text3)" }}
          >
            {d}
          </div>
        ))}
      </div>

      
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="grid gap-0.5 px-4 items-center"
          style={{
            gridTemplateColumns: "1fr repeat(7, 40px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            className="text-[12.5px] py-2.5 pr-3 truncate"
            style={{ color: "var(--text2)" }}
          >
            {habit.name}
          </div>
          {habit.history.map((done, i) => {
            let bg = "var(--bg4)";
            let border = "none";

            if (i < TODAY_INDEX) {
              bg = done ? "#7ec88a" : "rgba(232,114,106,0.15)";
            } else if (i === TODAY_INDEX) {
              bg = habit.completedToday ? "#7ec88a" : "transparent";
              border = habit.completedToday ? "none" : "1.5px solid rgba(255,255,200,0.14)";
            }

            return (
              <div key={i} className="flex items-center justify-center h-10">
                <div
                  className="w-[18px] h-[18px] rounded-full transition-all duration-200"
                  style={{ background: bg, border }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

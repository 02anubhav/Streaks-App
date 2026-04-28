"use client";

import { cn, getCategoryTagClass } from "@/lib/utils";
import type { Habit } from "@/types";

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  style?: React.CSSProperties;
}

export function HabitCard({ habit, onToggle, style }: HabitCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl px-[18px] py-4 flex items-center gap-3.5 cursor-pointer transition-all duration-150 overflow-hidden animate-fade-in-up",
        habit.completedToday
          ? "border-[rgba(126,200,138,0.2)]"
          : "hover:border-[rgba(255,255,200,0.14)] hover:bg-[#232219]"
      )}
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        ...style,
      }}
      onClick={() => onToggle(habit.id)}
    >
      
      {habit.completedToday && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: "#7ec88a" }}
        />
      )}

      
      <button
        className={cn(
          "w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 transition-all duration-200",
          habit.completedToday
            ? "border-[#7ec88a] bg-[#7ec88a]"
            : "border-[rgba(255,255,200,0.14)] bg-transparent hover:border-[rgba(255,255,200,0.3)]"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(habit.id);
        }}
        aria-label={habit.completedToday ? "Mark incomplete" : "Mark complete"}
      >
        {habit.completedToday && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.8 7L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "text-sm font-medium mb-0.5",
            habit.completedToday && "line-through opacity-50"
          )}
        >
          {habit.name}
        </div>
        <div
          className="text-xs flex gap-2.5 items-center"
          style={{ color: "var(--text3)" }}
        >
          <span
            className={cn(
              "text-[11px] px-2 py-0.5 rounded-full font-medium",
              getCategoryTagClass(habit.category)
            )}
          >
            {habit.category}
          </span>
          <span>{habit.frequency}</span>
          <HistoryDots history={habit.history} />
        </div>
      </div>

    
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div
          className="font-serif text-xl font-light leading-none"
          style={{ color: habit.color }}
        >
          {habit.streak}
        </div>
        <div
          className="text-[10px] uppercase tracking-[0.08em]"
          style={{ color: "var(--text3)" }}
        >
          streak
        </div>
      </div>
    </div>
  );
}

function HistoryDots({ history }: { history: number[] }) {
  return (
    <div className="flex gap-[3px]">
      {history.map((done, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: done ? "#7ec88a" : "var(--bg4)",
          }}
        />
      ))}
    </div>
  );
}

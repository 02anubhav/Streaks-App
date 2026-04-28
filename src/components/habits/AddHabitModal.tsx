"use client";

import { useState, useEffect, useRef } from "react";
import { HABIT_COLORS } from "@/lib/utils";
import type { Category, Frequency } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: Category[] = ["Mind", "Body", "Focus", "Health"];
const FREQUENCIES: Frequency[] = ["Daily", "Weekdays", "3x / week", "Weekly"];

interface AddHabitModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    category: Category;
    frequency: Frequency;
    color: string;
  }) => void;
}

export function AddHabitModal({ open, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Mind");
  const [frequency, setFrequency] = useState<Frequency>("Daily");
  const [color, setColor] = useState(HABIT_COLORS[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setName("");
      setCategory("Mind");
      setFrequency("Daily");
      setColor(HABIT_COLORS[0]);
    }
  }, [open]);

  const handleSubmit = () => {
    if (!name.trim()) {
      inputRef.current?.focus();
      return;
    }
    onAdd({ name: name.trim(), category, frequency, color });
    onClose();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-2xl p-7 w-[440px] max-w-[90vw] animate-slide-up"
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--border2)",
        }}
        onKeyDown={handleKey}
      >
        <h2 className="font-serif text-xl font-medium mb-5">New habit</h2>

       
        <FormGroup label="Habit name">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Morning run, Read 20 pages…"
            className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border2)",
              color: "var(--text)",
              fontFamily: "var(--font-dm-sans)",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--gold2)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,200,0.14)")
            }
          />
        </FormGroup>

        
        <FormGroup label="Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border2)",
              color: "var(--text)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormGroup>

        
        <FormGroup label="Frequency">
          <div className="flex gap-2">
            {FREQUENCIES.map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs transition-all duration-150 font-medium",
                  frequency === f
                    ? "text-[#e8c96a]"
                    : "hover:text-[#f0ede4]"
                )}
                style={{
                  background:
                    frequency === f
                      ? "rgba(232,201,106,0.12)"
                      : "transparent",
                  border:
                    frequency === f
                      ? "1px solid rgba(232,201,106,0.3)"
                      : "1px solid var(--border)",
                  color: frequency === f ? "var(--gold)" : "var(--text2)",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </FormGroup>

       
        <FormGroup label="Color">
          <div className="flex gap-2 flex-wrap">
            {HABIT_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className="w-7 h-7 rounded-full transition-all duration-150"
                style={{
                  background: c,
                  border:
                    color === c
                      ? "2px solid var(--text)"
                      : "2px solid transparent",
                }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </FormGroup>

        
        <div className="flex gap-2.5 mt-6 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm transition-all duration-150"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text2)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 disabled:opacity-40"
            style={{
              background: "var(--gold)",
              color: "#1a1500",
              border: "1px solid var(--gold)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            Add habit
          </button>
        </div>
      </div>
    </div>
  );
}

function FormGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div
        className="text-[11px] uppercase tracking-[0.08em] mb-1.5"
        style={{ color: "var(--text3)" }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

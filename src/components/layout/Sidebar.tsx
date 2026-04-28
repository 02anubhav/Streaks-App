"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types";

interface SidebarProps {
  completedCount: number;
  totalCount: number;
  activeCategory: Category | null;
  onCategoryFilter: (cat: Category | null) => void;
  onShowToast: (msg: string) => void;
}

const NAV_CATEGORIES: { label: Category; count: number }[] = [
  { label: "Mind", count: 3 },
  { label: "Body", count: 2 },
  { label: "Focus", count: 1 },
  { label: "Health", count: 1 },
];

export function Sidebar({
  completedCount,
  totalCount,
  activeCategory,
  onCategoryFilter,
  onShowToast,
}: SidebarProps) {
  return (
    <aside
      className="w-[240px] shrink-0 flex flex-col sticky top-0 h-screen overflow-y-auto"
      style={{ background: "var(--bg2)", borderRight: "1px solid var(--border)" }}
    >
      
      <div className="px-6 py-7" style={{ borderBottom: "1px solid var(--border)" }}>
        <div
          className="font-serif text-[22px] font-medium tracking-tight"
          style={{ color: "var(--gold)" }}
        >
          Streaks
        </div>
        <div
          className="text-[11px] uppercase tracking-[0.08em] mt-0.5"
          style={{ color: "var(--text3)" }}
        >
          Habit Tracker
        </div>
      </div>

      
      <nav className="p-3 flex-1">
        <SectionTitle>Overview</SectionTitle>
        <NavItem
          active={activeCategory === null}
          onClick={() => onCategoryFilter(null)}
          badge={`${completedCount}/${totalCount}`}
          icon="◈"
        >
          Today
        </NavItem>
        <NavItem icon="◎" onClick={() => onShowToast("Analytics coming soon!")}>
          Analytics
        </NavItem>

        <SectionTitle className="mt-4">Categories</SectionTitle>
        {NAV_CATEGORIES.map((c) => (
          <NavItem
            key={c.label}
            icon="◇"
            active={activeCategory === c.label}
            onClick={() =>
              onCategoryFilter(activeCategory === c.label ? null : c.label)
            }
            badge={String(c.count)}
          >
            {c.label}
          </NavItem>
        ))}

        <SectionTitle className="mt-4">Settings</SectionTitle>
        <NavItem icon="◌" onClick={() => onShowToast("Reminders coming soon!")}>
          Reminders
        </NavItem>
        <NavItem icon="◌" onClick={() => onShowToast("Export coming soon!")}>
          Export Data
        </NavItem>
      </nav>

      
      <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer"
          style={{ background: "var(--bg3)" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
            style={{
              background: "linear-gradient(135deg, #c9a83c, #e8c96a)",
              color: "#1a1500",
            }}
          >
            JS
          </div>
          <div>
            <div className="text-[13px] font-medium">Jamie S.</div>
            <div className="text-[11px]" style={{ color: "var(--text3)" }}>
              Level 8 · 🔥 21 day streak
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-[10px] uppercase tracking-[0.1em] px-3 mb-2 mt-1",
        className
      )}
      style={{ color: "var(--text3)" }}
    >
      {children}
    </div>
  );
}

function NavItem({
  children,
  icon,
  active,
  onClick,
  badge,
}: {
  children?: React.ReactNode;
  icon: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13.5px] transition-all duration-150 text-left",
        active
          ? "text-[#e8c96a]"
          : "hover:bg-[#232219]"
      )}
      style={
        active
          ? { background: "rgba(232,201,106,0.12)", color: "var(--gold)" }
          : { color: "var(--text2)" }
      }
    >
      <span className="text-[14px] w-4 flex items-center justify-center shrink-0 opacity-80">
        {icon}
      </span>
      <span className="flex-1">{children}</span>
      {badge && (
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full"
          style={
            active
              ? { background: "var(--gold2)", color: "#1a1500" }
              : { background: "var(--bg4)", color: "var(--text2)" }
          }
        >
          {badge}
        </span>
      )}
    </button>
  );
}

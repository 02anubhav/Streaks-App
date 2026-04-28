"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { HabitCard } from "@/components/habits/HabitCard";
import { WeeklyView } from "@/components/habits/WeeklyView";
import { CategoryRings } from "@/components/habits/CategoryRings";
import { ActivityHeatmap } from "@/components/habits/ActivityHeatmap";
import { QuoteCard } from "@/components/habits/QuoteCard";
import { AddHabitModal } from "@/components/habits/AddHabitModal";
import { StatCard } from "@/components/ui/StatCard";
import { ToastContainer } from "@/components/ui/Toast";
import { useHabits } from "@/hooks/useHabits";
import { useToast } from "@/hooks/useToast";
import { getGreeting, formatDate } from "@/lib/utils";
import type { Category } from "@/types";

export function HabitApp() {
  const {
    habits,
    stats,
    bestStreak,
    bestStreakHabit,
    toggleHabit,
    addHabit,
    loaded,
  } = useHabits();
  const { toasts, showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [weekViewOpen, setWeekViewOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const visibleHabits = activeCategory
    ? habits.filter((h) => h.category === activeCategory)
    : habits;

  const handleToggle = (id: string) => {
    const h = habits.find((x) => x.id === id);
    if (!h) return;
    toggleHabit(id);
    const nowDone = !h.completedToday;
    if (nowDone) showToast(`"${h.name}" completed! 🎉`);
  };

  const handleAdd = (data: Parameters<typeof addHabit>[0]) => {
    const habit = addHabit(data);
    showToast(`"${habit.name}" added!`);
  };

  const handleCategoryFilter = (cat: Category | null) => {
    setActiveCategory(cat);
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar
          completedCount={stats.completed}
          totalCount={stats.total}
          activeCategory={activeCategory}
          onCategoryFilter={handleCategoryFilter}
          onShowToast={showToast}
        />
      </div>

      <main className="flex-1 overflow-y-auto">
        <div
          className="px-4 sm:px-6 lg:px-9 pt-5 sm:pt-7 pb-4 sm:pb-6 
             flex items-center justify-between gap-3"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="min-w-0 flex-1">
            <h1
              className="font-serif font-medium tracking-tight leading-tight 
                 text-[15px] sm:text-[18px] md:text-[22px] lg:text-[26px] truncate"
            >
              {getGreeting()}, Jamie
            </h1>

            <p
              className="text-[10px] sm:text-[11px] md:text-[12px] mt-0.5 truncate"
              style={{ color: "var(--text3)" }}
            >
              {formatDate(new Date())}
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setWeekViewOpen((v) => !v)}
              className="inline-flex items-center justify-center gap-1
                 h-8 sm:h-9
                 px-2 sm:px-3 md:px-4
                 rounded-md sm:rounded-lg
                 text-[11px] sm:text-[12px] md:text-[13px]
                 font-medium transition-all duration-150
                 whitespace-nowrap"
              style={{
                border: "1px solid var(--border2)",
                background: weekViewOpen ? "var(--bg3)" : "transparent",
                color: weekViewOpen ? "var(--text)" : "var(--text2)",
              }}
            >
              ⊡
              <span className="ml-1 sm:ml-1.5">
                <span className="sm:hidden">Week</span>
                <span className="hidden sm:inline">Week view</span>
              </span>
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-1
                 h-8 sm:h-9
                 px-2 sm:px-3 md:px-4
                 rounded-md sm:rounded-lg
                 text-[11px] sm:text-[12px] md:text-[13px]
                 font-medium transition-all duration-150
                 whitespace-nowrap"
              style={{
                background: "var(--gold)",
                color: "#1a1500",
                border: "1px solid var(--gold)",
              }}
            >
              +
              <span className="ml-1 sm:ml-1.5">
                <span className="sm:hidden">New</span>
                <span className="hidden sm:inline">New habit</span>
              </span>
            </button>
          </div>
        </div>

        <div className="px-4 py-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-7">
            <StatCard
              label="Today's Progress"
              value={
                <>
                  {loaded ? stats.completed : "—"}
                  <span
                    className="text-sm font-sans ml-1"
                    style={{ color: "var(--text3)" }}
                  >
                    / {stats.total}
                  </span>
                </>
              }
              sub={`${stats.percentage}% complete`}
              accentColor="#e8c96a"
            />
            <StatCard
              label="Best Streak"
              value={
                <>
                  {bestStreak}
                  <span
                    className="text-sm font-sans ml-1"
                    style={{ color: "var(--text3)" }}
                  >
                    days
                  </span>
                </>
              }
              sub={bestStreakHabit?.name ?? "—"}
              accentColor="#7ec88a"
            />
            <StatCard
              label="This Week"
              value={
                <>
                  84
                  <span
                    className="text-sm font-sans ml-1"
                    style={{ color: "var(--text3)" }}
                  >
                    %
                  </span>
                </>
              }
              sub="6% above last week"
              accentColor="#7ab3e0"
            />
            <StatCard
              label="Total Habits"
              value={habits.length}
              sub="Active habits"
              accentColor="#b89fe0"
            />
          </div>

          {weekViewOpen && (
            <div className="mb-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[15px] font-medium">This week</div>
                <button
                  onClick={() => setWeekViewOpen(false)}
                  className="text-xs transition-colors"
                  style={{ color: "var(--text3)" }}
                >
                  Close ×
                </button>
              </div>
              <WeeklyView habits={habits} />
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="text-[15px] font-medium">Today's habits</div>
                {activeCategory && (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="text-xs transition-colors"
                    style={{ color: "var(--text3)" }}
                  >
                    {activeCategory} ×
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                {loaded ? (
                  visibleHabits.length > 0 ? (
                    visibleHabits.map((h, i) => (
                      <HabitCard
                        key={h.id}
                        habit={h}
                        onToggle={handleToggle}
                        style={{ animationDelay: `${i * 0.04}s` }}
                      />
                    ))
                  ) : (
                    <div
                      className="text-sm py-10 text-center"
                      style={{ color: "var(--text3)" }}
                    >
                      No habits yet.{" "}
                      <button
                        onClick={() => setModalOpen(true)}
                        style={{ color: "var(--gold)" }}
                      >
                        Add one →
                      </button>
                    </div>
                  )
                ) : (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[68px] rounded-xl animate-pulse"
                      style={{ background: "var(--bg2)" }}
                    />
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <QuoteCard />
              <CategoryRings habits={habits} />
              <ActivityHeatmap />
            </div>
          </div>
        </div>
      </main>

      <AddHabitModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}

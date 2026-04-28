"use client";

import { useState, useEffect, useCallback } from "react";
import type { Habit, Category, Frequency } from "@/types";
import { DEFAULT_HABITS } from "@/lib/utils";

const STORAGE_KEY = "streaks_habits";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setHabits(JSON.parse(raw));
      } else {
        setHabits(DEFAULT_HABITS);
      }
    } catch {
      setHabits(DEFAULT_HABITS);
    }
    setLoaded(true);
  }, []);

  
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }
  }, [habits, loaded]);

  const toggleHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const nowDone = !h.completedToday;
        return {
          ...h,
          completedToday: nowDone,
          streak: nowDone ? h.streak + 1 : Math.max(0, h.streak - 1),
        };
      })
    );
  }, []);

  const addHabit = useCallback(
    (data: {
      name: string;
      category: Category;
      frequency: Frequency;
      color: string;
    }) => {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: data.name,
        category: data.category,
        frequency: data.frequency,
        color: data.color,
        streak: 0,
        completedToday: false,
        history: [0, 0, 0, 0, 0, 0, 0],
        createdAt: new Date().toISOString(),
      };
      setHabits((prev) => [...prev, newHabit]);
      return newHabit;
    },
    []
  );

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const editHabit = useCallback(
    (
      id: string,
      data: Partial<Pick<Habit, "name" | "category" | "frequency" | "color">>
    ) => {
      setHabits((prev) =>
        prev.map((h) => (h.id === id ? { ...h, ...data } : h))
      );
    },
    []
  );

  const stats = {
    completed: habits.filter((h) => h.completedToday).length,
    total: habits.length,
    percentage:
      habits.length === 0
        ? 0
        : Math.round(
            (habits.filter((h) => h.completedToday).length / habits.length) *
              100
          ),
  };

  const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const bestStreakHabit = habits.find((h) => h.streak === bestStreak);

  return {
    habits,
    loaded,
    stats,
    bestStreak,
    bestStreakHabit,
    toggleHabit,
    addHabit,
    deleteHabit,
    editHabit,
  };
}

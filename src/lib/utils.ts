import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Category } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryColor(cat: Category): string {
  const map: Record<Category, string> = {
    Mind: "#b89fe0",
    Body: "#7ec88a",
    Focus: "#7ab3e0",
    Health: "#e8c96a",
  };
  return map[cat];
}

export function getCategoryTagClass(cat: Category): string {
  const map: Record<Category, string> = {
    Mind: "bg-purple-500/10 text-[#b89fe0]",
    Body: "bg-green-500/10 text-[#7ec88a]",
    Focus: "bg-blue-500/10 text-[#7ab3e0]",
    Health: "bg-yellow-500/10 text-[#e8c96a]",
  };
  return map[cat];
}

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const QUOTES = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.",
    author: "Aristotle",
  },
  {
    text: "A small daily task, if it be really daily, will beat the labours of a spasmodic Hercules.",
    author: "Anthony Trollope",
  },
  {
    text: "The secret of your future is hidden in your daily routine.",
    author: "Mike Murdock",
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
  },
  {
    text: "You'll never change your life until you change something you do daily.",
    author: "John C. Maxwell",
  },
];

export const HABIT_COLORS = [
  "#7ec88a",
  "#7ab3e0",
  "#b89fe0",
  "#e8c96a",
  "#e8726a",
  "#e8a86a",
];

export const DEFAULT_HABITS = [
  {
    id: "1",
    name: "Morning meditation",
    category: "Mind" as Category,
    frequency: "Daily" as const,
    streak: 21,
    color: "#b89fe0",
    completedToday: false,
    history: [1, 1, 1, 0, 1, 1, 1],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "30 min run",
    category: "Body" as Category,
    frequency: "Daily" as const,
    streak: 14,
    color: "#7ec88a",
    completedToday: false,
    history: [1, 1, 0, 1, 1, 1, 0],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Read 30 pages",
    category: "Mind" as Category,
    frequency: "Daily" as const,
    streak: 9,
    color: "#7ab3e0",
    completedToday: false,
    history: [0, 1, 1, 1, 1, 0, 1],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Cold shower",
    category: "Health" as Category,
    frequency: "Daily" as const,
    streak: 5,
    color: "#e8c96a",
    completedToday: false,
    history: [1, 0, 1, 1, 0, 1, 1],
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Deep work block",
    category: "Focus" as Category,
    frequency: "Weekdays" as const,
    streak: 12,
    color: "#7ab3e0",
    completedToday: false,
    history: [1, 1, 1, 1, 1, 0, 0],
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Evening journal",
    category: "Mind" as Category,
    frequency: "Daily" as const,
    streak: 3,
    color: "#b89fe0",
    completedToday: false,
    history: [0, 0, 1, 1, 1, 1, 1],
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Strength training",
    category: "Body" as Category,
    frequency: "3x / week" as const,
    streak: 7,
    color: "#7ec88a",
    completedToday: false,
    history: [1, 0, 1, 0, 1, 0, 0],
    createdAt: new Date().toISOString(),
  },
];

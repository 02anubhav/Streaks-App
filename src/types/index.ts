export type Category = "Mind" | "Body" | "Focus" | "Health";
export type Frequency = "Daily" | "Weekdays" | "3x / week" | "Weekly";

export interface Habit {
  id: string;
  name: string;
  category: Category;
  frequency: Frequency;
  color: string;
  streak: number;
  completedToday: boolean;
  history: number[]; 
  createdAt: string;
}

export interface DailyStats {
  completed: number;
  total: number;
  percentage: number;
}

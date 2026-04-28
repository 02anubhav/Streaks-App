# Streaks — Habit Tracker

A premium dark-themed habit tracker built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ✅ **Daily habit tracking** — one-tap check-off with streak counters
- 📅 **Weekly view** — full grid of all habits × days at a glance
- 📊 **Category rings** — animated circular progress per category (Mind, Body, Focus, Health)
- 🔥 **Activity heatmap** — 84-day contribution-style heatmap
- ➕ **Add habit modal** — name, category, frequency, and color picker
- 💾 **Persistent storage** — all data saved to localStorage
- 🔔 **Toast notifications** — non-intrusive feedback on every action
- 📱 **Responsive** — sidebar hidden on mobile, fluid grid layout

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)
- **Google Fonts** — Fraunces (serif display) + DM Sans (body)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```


## Project Structure

```
src/
├── app/
│   ├── layout.tsx         
│   ├── page.tsx            
│   └── globals.css         
├── components/
│   ├── habits/
│   │   ├── HabitApp.tsx    
│   │   ├── HabitCard.tsx   
│   │   ├── WeeklyView.tsx  
│   │   ├── CategoryRings.tsx 
│   │   ├── ActivityHeatmap.tsx 
│   │   ├── QuoteCard.tsx  
│   │   └── AddHabitModal.tsx 
│   ├── layout/
│   │   └── Sidebar.tsx     
│   └── ui/
│       ├── StatCard.tsx    
│       └── Toast.tsx       
├── hooks/
│   ├── useHabits.ts        
│   └── useToast.ts         
├── lib/
│   └── utils.ts            
└── types/
    └── index.ts           
```

## Deployment

Deploy instantly to Vercel:

```bash
npm i -g vercel
vercel
```

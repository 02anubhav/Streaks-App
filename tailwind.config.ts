import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0f0e0b",
          2: "#1a1916",
          3: "#232219",
          4: "#2d2c22",
        },
        gold: {
          DEFAULT: "#e8c96a",
          dim: "#c9a83c",
        },
        streak: {
          green: "#7ec88a",
          blue: "#7ab3e0",
          purple: "#b89fe0",
          red: "#e8726a",
          amber: "#e8a86a",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderColor: {
        subtle: "rgba(255,255,200,0.08)",
        muted: "rgba(255,255,200,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;

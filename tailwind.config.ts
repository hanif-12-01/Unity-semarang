import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        civic: {
          ink: "#16202A",
          muted: "#60707F",
          panel: "#F8FAFC",
          soft: "#F3F6F8",
          primary: "#0F766E",
          secondary: "#2563EB",
          line: "#D8E0E8",
        },
        priority: {
          high: "#DC2626",
          medium: "#D97706",
          low: "#059669",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

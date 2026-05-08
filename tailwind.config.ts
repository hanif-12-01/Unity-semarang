import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        civic: {
          ink:     "#1F1A17",
          muted:   "#6F6258",
          surface: "#FFFDF7",
          panel:   "#F4EFE6",
          soft:    "#EAE2D3", 
          line:    "#D8CCBA",
          primary: "#2F756E",
          secondary: "#1D4ED8", 
          dark:    "#2A211C",
          brick:   "#A4512B",
          gold:    "#B58A27",
          moss:    "#3F7D5D",
        },
        priority: {
          high:   "#A33A2C",
          medium: "#B58A27",
          low:    "#3F7D5D",
        },
        // Override default emerald with muted moss palette
        emerald: {
          50:  "#eaf3ef",
          100: "#cce0d5",
          200: "#a0c3b1",
          300: "#7ab497",
          400: "#509677",
          500: "#3F7D5D", // Base priority low
          600: "#2d5e46",
          700: "#244937",
          800: "#1e3b2c",
          900: "#183024",
          950: "#0f1f17",
        },
        // Override default teal with muted teal palette
        teal: {
          50:  "#e7f0ef",
          100: "#c3dad8",
          200: "#9bbbba",
          300: "#6da3a1",
          400: "#4b8c8a",
          500: "#2F756E", // Base primary
          600: "#245e58",
          700: "#1e4c47",
          800: "#183e3a",
          900: "#14332f",
          950: "#0b1d1a",
        },
        // Override default red with muted terracotta palette
        red: {
          50:  "#f5eceb",
          100: "#e7d1cd",
          200: "#d1a59f",
          300: "#b9766e",
          400: "#a34e45",
          500: "#A33A2C", // Base high priority
          600: "#8c2f22",
          700: "#74251a",
          800: "#5c1c14",
          900: "#46140d",
          950: "#290a07",
        },
        // Override default amber with muted sogan gold palette
        amber: {
          50:  "#f6efe9",
          100: "#ead9c7",
          200: "#dab99a",
          300: "#c9986b",
          400: "#bc7c46",
          500: "#B58A27", // Base medium priority/gold
          600: "#9b721e",
          700: "#815b15",
          800: "#67450c",
          900: "#4e3106",
          950: "#2e1a02",
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "batik-stripes": "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(216, 204, 186, 0.05) 10px, rgba(216, 204, 186, 0.05) 20px)",
      },
    },
  },
  plugins: [],
} satisfies Config;

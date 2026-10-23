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
        paprika: {
          DEFAULT: "#C4521A",
          50: "#FDF4EF",
          100: "#FAE6D9",
          200: "#F5C9B0",
          300: "#EFA582",
          400: "#E47A4D",
          500: "#C4521A",
          600: "#A34315",
          700: "#833612",
          800: "#6B2E12",
          900: "#582812",
        },
        cream: {
          DEFAULT: "#F4EFE6",
          50: "#FDFCFA",
          100: "#F4EFE6",
          200: "#E8DFD0",
          300: "#D4C6B0",
        },
        ink: {
          DEFAULT: "#1A1612",
          muted: "#5C534A",
          faint: "#8A8075",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(26,22,18,0.08)",
        elevated: "0 8px 30px rgba(26,22,18,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

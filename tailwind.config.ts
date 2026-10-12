import type { Config } from "tailwindcss";

// Brand tokens from the plan: cream ground, deep navy type, one gold accent for the primary action.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f6f1e7",
        panel: "#fffcf6",
        navy: { DEFAULT: "#14223a", 2: "#22324d", soft: "#3b4558" },
        muted: "#5d6472",
        line: "#e2d9c7",
        gold: { DEFAULT: "#d6a032", ink: "#8a5f08", tint: "#f6e8c8" },
        pine: { DEFAULT: "#2c5a4c", tint: "#e3eee9" },
        rust: { DEFAULT: "#9b3b22", tint: "#f6e3db" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      maxWidth: { page: "1180px", prose: "66ch" },
    },
  },
  plugins: [],
};

export default config;

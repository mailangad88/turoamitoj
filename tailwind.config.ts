import type { Config } from "tailwindcss";

// Brand tokens from the Rent and Drive logo: black type, warm off-white ground, one orange accent for the primary action.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f7f6f3",
        panel: "#ffffff",
        ink: { DEFAULT: "#111111", 2: "#1f1f22", soft: "#44444a" },
        muted: "#5f5f66",
        line: "#e6e2dc",
        brand: { DEFAULT: "#ff7a00", ink: "#c2410c", tint: "#ffedd5" },
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

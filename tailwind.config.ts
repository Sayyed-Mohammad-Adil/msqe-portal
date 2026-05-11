import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-cyan": "#00f5c4",
        "neon-purple": "#a855f7",
        "neon-amber": "#f59e0b",
        "neon-red": "#f43f5e",
        "neon-blue": "#3b82f6",
        "neon-green": "#22c55e",
        "dark-950": "#050508",
        "dark-900": "#0b0c12",
        "dark-800": "#0f1018",
        "dark-700": "#13141e",
        "dark-600": "#1a1b28",
      },
      fontFamily: {
        sans: ["var(--font-syne)"],
        mono: ["var(--font-space-mono)"],
        body: ["var(--font-inter)"],
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        typewriter: "typewriter steps(1) forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

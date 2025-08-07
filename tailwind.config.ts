import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["Oswald", "sans-serif"],
      },
      colors: {
        primary: "#a78bfa",
        secondary: "#f472b6",
        accent: "#ec4899",
        background: "#0f0a0a",
        text: "#f3f4f6",
      },
      letterSpacing: {
        widest: ".25em",
      },
    },
  },
  plugins: [typography],
};

export default config;

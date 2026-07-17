import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: "#f3d9de",
        gold: "#b8892f",
        "gold-bright": "#d8b567",
        ivory: "#fbf6ee",
        paper: "#fffdf9",
        burgundy: "#6e2334",
        jade: "#4f7566",
        charcoal: "#2b2622",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        zh: ["var(--font-noto-sc)", "serif"],
        script: ["var(--font-cormorant)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

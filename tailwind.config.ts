import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0c1844",
        secondary: "#c80036",
      },
    },
  },
  plugins: [],
} satisfies Config;

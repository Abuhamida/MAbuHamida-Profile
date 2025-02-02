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
      animation: {
        "spin-slow": "spin 2.5s linear infinite",
        "left-to-right": "leftToRight 2.5s linear",
      },
      backgroundImage: {
        "fixed-gradient":
          "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(50,50,50,1) 50%, rgba(139,139,139,1) 100%)",
          "box-gradient-1":"linear-gradient(40deg, rgba(25,25,25,1) 21%, rgba(35,35,35,1) 99%)",
          "box-gradient-2":"linear-gradient(0deg, rgba(20,20,20,1) 21%, rgba(35,35,35,1) 99%)",
      },
      colors: {
        primary: "#F1EFEF",
        secondary: "#c80036",
        mainB: "#191717",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;

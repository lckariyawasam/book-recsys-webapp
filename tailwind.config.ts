import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors :{
        primary: {
          DEFAULT: "#EBB923",
          100: "#FDFAEE",
          200: "#FCEB9E",
          300: "#EBB923",
          400: "#8B6C0D",
          500: "#554208"
        },
        secondary: {
          DEFAULT: "#FFD700",
          100:"#9095A1",
          200: "#6F7787",
          300: "#565D6D",
          400: "#323743"
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      shrikhand: ["Shrikhand"],
    },
    extend: {
      colors: {
        primary: "#CA4526",
        secondary: "#FD8E4A",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

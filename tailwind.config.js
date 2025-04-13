import { heroui } from "@heroui/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ['var(--font-aeonik)'],
        'oldschool-grotesk': ['var(--font-oldschool-grotesk)']
      }
    },
  },
  plugins: [heroui()],
  darkMode: "class",
};

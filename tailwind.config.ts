// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E1B7F", // <-- This should be used
        secondary: "#7FBC8F",
        tertiary: "#FFBA31",
        accent: "#FC535E",
        "gray-light": "D9D9D9",
      },
      fontFamily: {
        gothic: ["var(--font-gothic-a1)", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1440px",
      },
      textShadow: {
        xl: "1px 3px 3px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "twirl-in": "twirl-in 1s ease-in forwards",
        "twirl-out": "twirl-out 1s ease-in forwards",
      },
      keyframes: {
        "twirl-in": {
          "0%": { transform: "rotate(0deg) scale(0)" },
          "25%": { transform: "rotate(0deg) scale(0.5)" },
          "50%": { transform: "rotate(360deg) scale(1.5)" },
          "100%": { transform: "rotate(720deg) scale(1)" },
        },
        "twirl-out": {
          "0%": { transform: "rotate(720deg) scale(1)" },
          "100%": { transform: "rotate(1080deg) scale(0)" },
        },
      },
    },
  },
  safelist: ["text-primary"],
  plugins: [],
  darkMode: "class",
};

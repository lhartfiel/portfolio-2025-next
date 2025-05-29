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
    },
  },
  safelist: ["text-primary"],
  plugins: [],
};

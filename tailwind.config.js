/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
      kalnia: ["Kalnia", "serif"],
    },
  },
  plugins: [],
};

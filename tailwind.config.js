/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
      },
      colors: {
        facebook: '#1877F2',
      },
      ringColors: {
        facebook: '#1877F2',
      },
    },
  },
  plugins: [],
};

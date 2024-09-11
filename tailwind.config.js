/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter : ["Inter", "sans-serif"]
      },
      colors: {
        white: "#FFFFFF",
        black: "#111315",
        darkGray: "#292C2D",
        gray: "#484848",
        lightGray: "#969696",
        green: "#CFDDDB",
        pink: "#E4CDED",
        blue: "#C2DBE9",
        purple: "#C9CAEF"
      }
    },
  },
  plugins: [],
}
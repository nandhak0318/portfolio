/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/skills.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

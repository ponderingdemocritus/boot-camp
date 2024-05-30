/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-yellow-100",
    "hover:bg-red-100",
    "hover:bg-green-100",
    "hover:bg-blue-100",
    "hover:bg-yellow-200",
    "border-red-100",
    "border-blue-100",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

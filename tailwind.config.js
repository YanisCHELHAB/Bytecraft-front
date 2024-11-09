/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueMa: "#02295a",
        bluePur: "#473dff",
        bluePas: "#adbeff",
        blueLi: "#bfe2fd",
        redSt: "#ed3548",
        grayCo: "#9699ab",
        grayLi: "#d6d9e6",
        Magnolia: "#f0f6ff",
        Alabaster: "#fafbff",
        White: "#ffffff",
      },
    },
    plugins: [],
  },
};

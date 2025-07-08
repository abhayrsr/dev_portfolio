/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "10rem", // changed breakpoint
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [],
};

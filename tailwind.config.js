/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom grid template
        "3-1-2": "3fr 1fr 2fr",
      },
    },
  },
  plugins: [],
};

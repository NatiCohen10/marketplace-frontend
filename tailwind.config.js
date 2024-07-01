/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom grid template
        "3-1-2": "3fr 1fr 2fr",
      },
      minHeight: {
        "60vh": "60vh",
      },
      colors: {
        primary: "#2563EB",

        secondary: "#D97706",

        background: {
          100: "#F3F4F6",
          400: "#F5F5F5",
        },
        surface: "#FFFFFF",
        error: {
          600: "#DC2626",
        },
        onPrimary: "#FFFFFF",
        onSecondary: "#000000",
        onBackground: {
          800: "#1F2937",
        },
        onSurface: {
          800: "#1F2937",
        },
        onError: "#FFFFFF",
        alternative: {
          600: "#319795",
        },
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateX(-40px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};

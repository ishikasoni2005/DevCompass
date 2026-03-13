/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#07111f",
        aurora: {
          50: "#f0fdff",
          100: "#cffafe",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        ember: {
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        glow: "0 24px 80px rgba(34, 211, 238, 0.16)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};


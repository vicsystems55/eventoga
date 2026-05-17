/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["0.9rem", { lineHeight: "1.2rem" }],
      sm: ["1.05rem", { lineHeight: "1.4rem" }],
      base: ["1.2rem", { lineHeight: "1.75rem" }],
      lg: ["1.35rem", { lineHeight: "1.9rem" }],
      xl: ["1.5rem", { lineHeight: "2rem" }],
      "2xl": ["1.8rem", { lineHeight: "2.3rem" }],
      "3xl": ["2.25rem", { lineHeight: "2.7rem" }],
      "4xl": ["2.7rem", { lineHeight: "3rem" }],
      "5xl": ["3.6rem", { lineHeight: "1" }],
      "6xl": ["4.5rem", { lineHeight: "1" }],
      "7xl": ["5.4rem", { lineHeight: "1" }],
    },
    extend: {
      animation: {
        "neon-glow": "neon-glow 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-down": "slide-down 0.5s ease-out",
      },
      keyframes: {
        "neon-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(255, 102, 0, 0.5), 0 0 40px rgba(255, 102, 0, 0.3), inset 0 0 20px rgba(255, 102, 0, 0.1)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(255, 102, 0, 0.8), 0 0 60px rgba(255, 102, 0, 0.5), inset 0 0 30px rgba(255, 102, 0, 0.2)",
          },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-neon": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(255, 102, 0, 0.5), 0 0 40px rgba(255, 102, 0, 0.3)",
        "neon-lg":
          "0 0 30px rgba(255, 102, 0, 0.8), 0 0 60px rgba(255, 102, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

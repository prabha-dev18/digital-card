/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./hooks/**/*.{js,jsx,ts,tsx,mdx}",
    "./lib/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#F26522",
          green: "#157327",
          navy: "#03254C",
          white: "#ffffff",
          offWhite: "#fafafa",
          orangeLight: "#fff7ed",
          greenLight: "#f0fdf4",
        },
      },

      fontFamily: {
        sans: [
          "var(--font-poppins)",
          "system-ui",
          "sans-serif",
        ],
        script: [
          "var(--font-kaushan)",
          "cursive",
        ],
      },

      boxShadow: {
        card:
          "0 20px 45px -20px rgba(3,37,76,0.35)",
        soft:
          "0 10px 30px -12px rgba(3,37,76,0.18)",
      },
    },
  },

  plugins: [],
};
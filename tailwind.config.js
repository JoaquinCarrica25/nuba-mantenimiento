/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nuba-cyan":   "#00BCD4",
        "nuba-cyan-dark": "#0097A7",
        "nuba-blue":   "#1a2e4a",
        "nuba-accent": "#00BCD4",
        "page":        "#f4f6f9",
        "sidebar":     "#1a2e4a",
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

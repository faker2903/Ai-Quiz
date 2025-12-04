/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
      boxShadow: {
        'neumorphic': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'neumorphic-inset': 'inset 20px 20px 60px #d1d9e6, inset -20px -20px 60px #ffffff',
        'neumorphic-dark': '20px 20px 60px #1b1b1b, -20px -20px 60px #2f2f2f',
        'neumorphic-dark-inset': 'inset 20px 20px 60px #1b1b1b, inset -20px -20px 60px #2f2f2f',
      }
    },
  },
  plugins: [],
}

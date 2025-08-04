/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        logo: ['Playfair Display', 'serif'],
      },
      colors: {
        'background': '#111827',
        'text-primary': '#E5E7EB',
        'text-muted': '#9CA3AF',
        'accent': '#38BDF8',
        'accent-secondary': '#F472B6',
        'accent-light': '#7DD3FC',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          dark: '#1e1e1e',
          light: '#e6e6e6',
        },
        rose: '#ff66a1',
      },
    },
  },
  plugins: [],
};

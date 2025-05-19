/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // for Vite
    './src/**/*.{js,ts,jsx,tsx}', // your React components and pages
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

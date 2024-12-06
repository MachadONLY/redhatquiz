/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'red-hat': {
          50: '#fff1f1',
          100: '#ffdfdf',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#ff6464',
          500: '#ff2323',
          600: '#ee0000',
          700: '#c80000',
          800: '#a40606',
          900: '#880d0d',
          950: '#4b0000',
        },
      },
    },
  },
  plugins: [],
};
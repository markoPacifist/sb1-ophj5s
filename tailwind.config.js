/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc5c5',
          300: '#ff9e9e',
          400: '#ff8585',
          500: '#FF6B6B',
          600: '#ff5252',
          700: '#ff3838',
          800: '#ff1f1f',
          900: '#ff0505',
        },
      },
      zIndex: {
        '50': '50',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
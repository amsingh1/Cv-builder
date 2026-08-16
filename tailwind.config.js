/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f5f7fa',
          100: '#e9edf3',
          200: '#cfd8e3',
          300: '#a7b6c9',
          400: '#7890a9',
          500: '#57708c',
          600: '#435972',
          700: '#37485d',
          800: '#2b3947',
          900: '#141b23',
        },
      },
    },
  },
  plugins: [],
}

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
        cream: {
          50: '#fdfaf5',
          100: '#f7efe1',
          200: '#f0e4cc',
        },
        navy: {
          900: '#132a42',
          800: '#1b3a5c',
          700: '#254b73',
          600: '#2c5a86',
          500: '#3f719f',
          400: '#7fa0bc',
        },
        sky: {
          500: '#2fa8d5',
          400: '#4fc0e8',
          300: '#8ed4ee',
          200: '#c3e8f5',
        },
      },
    },
  },
  plugins: [],
}

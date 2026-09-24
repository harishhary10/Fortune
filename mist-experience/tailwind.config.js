/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        mist: {
          forest: '#173c32',
          ink: '#101a16',
          cream: '#f6f3ec',
          gold: '#b89557',
        },
      },
      letterSpacing: {
        wideish: '.14em',
      },
    },
  },
  plugins: [],
};

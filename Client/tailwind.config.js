/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('./src/assets/background.svg')",
      },
      colors: {
        fadeBlack: '#1F1F1F',
      },
    },
  },
  plugins: [],
};

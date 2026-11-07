/** @type {import('tailwindcss').Config} */
// Färgerna kommer ur bilden: grunden är dess ljusa botten, blækket dess
// mörkaste krom. Det enda kulören är Tjerenkov-blått, reaktorbassängens glöd.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grund: '#efedee',
        blaek: '#16191d',
        staal: '#55595f',
        krom: '#c9c7c9',
        cherenkov: {
          DEFAULT: '#0a5bd8',
          glow: 'rgba(10, 91, 216, 0.14)',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        skilt: ['Michroma', 'Eurostile', '"Bank Gothic"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        site: '72rem',
      },
    },
  },
  plugins: [],
};

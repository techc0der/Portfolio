// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // Make sure to configure the content path to scan your files.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         'playpen': ['"Playpen Sans"', 'cursive'], 
      },
    },
  },
  plugins: [],
}
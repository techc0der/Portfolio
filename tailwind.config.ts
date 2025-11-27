// tailwind.config.js
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         'playpen': ['"Playpen Sans"', 'cursive'], 
      },
      keyframes: {
        neonFlicker: {
          '0%, 100%': {
            textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff',
          },
          '50%': {
            textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff, 0 0 40px #ff00ff, 0 0 50px #ff00ff, 0 0 75px #ff00ff',
          },
        },
      },
      animation: {
        neonFlicker: 'neonFlicker 1.5s infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;

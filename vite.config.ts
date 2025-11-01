// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // The 'theme' object does not go here.
  plugins: [react(), tailwindcss()],
  base: '/Portfolio/',
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set the base path for deployment to GitHub Pages.
  // Replace 'Gemini-Search-Chatbox-' with your actual repository name.
  base: '/Gemini-Search-Chatbox-/',
})
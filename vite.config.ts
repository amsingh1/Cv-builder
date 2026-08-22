import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from a custom domain (buildfreecv.com) at the site root, so
// assets are referenced from '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})

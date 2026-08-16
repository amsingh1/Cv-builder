import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo is served from https://<user>.github.io/Cv-builder/ so all
// asset URLs need that base path baked in at build time.
export default defineConfig({
  plugins: [react()],
  base: '/Cv-builder/',
})

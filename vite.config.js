import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    // Allow Render's *.onrender.com host to reach the preview server
    allowedHosts: true,
  },
})

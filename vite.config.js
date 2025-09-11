import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Use root in dev/local preview, repo path in production (GitHub Pages)
  base: mode === 'production' ? '/Chatbot/' : '/',
  // Ensure env is embedded at build time in CI
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || ''),
    'import.meta.env.VITE_API_METHOD': JSON.stringify(process.env.VITE_API_METHOD || 'POST'),
  },
  server: {
    open: true,
    port: 5173,
  },
}))



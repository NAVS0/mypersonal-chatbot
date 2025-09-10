import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/navs-chatbot",
  server: {
    open:true,
    port: 5173,
  },
})



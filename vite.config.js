import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/voter-lookup': {
        target: 'https://bcmg-election-2026.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/voter-lookup/, '/api/search'),
      },
    },
  },
})

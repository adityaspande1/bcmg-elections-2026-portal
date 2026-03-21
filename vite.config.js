import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/bmc': {
        target: 'https://103.150.187.72:88',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/bmc/, ''),
      },
    },
  },
})

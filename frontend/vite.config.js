import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
  
// })

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:4001', // Backend server URL
        changeOrigin: true,
        timeout: 50000,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix if needed
      },
    },
  },
})
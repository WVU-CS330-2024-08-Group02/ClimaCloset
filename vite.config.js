import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set the port to 3000
    host: '0.0.0.0', // This allows the server to be accessible externally
  },
})

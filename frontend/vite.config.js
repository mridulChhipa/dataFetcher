import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE)
  }
})

import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bristles/',
  plugins: [react()],
  resolve: {
    alias: {
      "@bristles/web": path.resolve(__dirname, "./src"),
    },
  },
})

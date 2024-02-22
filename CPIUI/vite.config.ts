import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
})
function tailwind(): import("vite").PluginOption {
  throw new Error('Function not implemented.')
}


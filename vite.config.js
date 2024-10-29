import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://sebastiancardenasyanez.github.io/notes/",
  server: {
    port: 8080,
  }
})

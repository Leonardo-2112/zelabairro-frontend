import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite com o plugin do React e o do Tailwind CSS v4
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

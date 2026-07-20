import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { BASE_PATH } from './scripts/base-path.mjs'

export default defineConfig({
  // Served from GitHub Pages out of docs/ on the default branch.
  base: BASE_PATH,
  build: {
    // GitHub Pages only publishes from the repo root or docs/, so build there
    // directly and commit it — dist/ is gitignored and would never ship.
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
})

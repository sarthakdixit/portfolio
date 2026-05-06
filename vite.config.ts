import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  // Update this to match your GitHub repo name when deploying to GitHub Pages.
  // Example: for https://username.github.io/portfolio/, set base: '/portfolio/'
  // For Vercel, Netlify, or a custom domain at the root, leave as '/'.
  base: '/portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});

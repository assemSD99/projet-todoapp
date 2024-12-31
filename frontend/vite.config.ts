import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085', // URL de votre backend
        changeOrigin: true, // Modifier l'origine pour correspondre à l'URL cible
        rewrite: (path) => path.replace(/^\/api/, ''), // Réécrit l'URL en supprimant /api si nécessaire
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

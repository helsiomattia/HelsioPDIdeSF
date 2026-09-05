import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/crm-specialist/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/@mui/') || id.includes('\\@mui\\')) return 'mui';
          if (id.includes('/@emotion/') || id.includes('\\@emotion\\')) return 'emotion';
          if (id.includes('/gsap/') || id.includes('\\gsap\\')) return 'animation';
          if (id.includes('/i18next') || id.includes('\\i18next') || id.includes('/react-i18next') || id.includes('\\react-i18next')) return 'i18n';
          if (id.includes('/react/') || id.includes('\\react\\') || id.includes('/react-dom/') || id.includes('\\react-dom\\')) return 'react';
          return undefined;
        },
      },
    },
  },
}));

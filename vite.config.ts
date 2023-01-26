import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { viteRequire } from 'vite-require';
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path';

// https://github.com/bvaughn/react-virtualized/issues/1212
const resolveFixup = {
  name: 'resolve-fixup',
  setup(build) {
    build.onResolve({ filter: /react-virtualized/ }, async args => {
      return {
        path: path.resolve('./node_modules/react-virtualized/dist/umd/react-virtualized.js'),
      }
    })
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), viteRequire(), VitePWA({
    registerType: 'autoUpdate',
    workbox: {
      clientsClaim: true,
      skipWaiting: true,
    }
  })],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [resolveFixup]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
});
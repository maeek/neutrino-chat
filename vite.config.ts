import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { viteRequire } from 'vite-require';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), viteRequire()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
});
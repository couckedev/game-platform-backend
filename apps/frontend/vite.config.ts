import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const port = Number(env.VITE_PORT);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('VITE_PORT doit être défini dans apps/frontend/.env');
  }

  return {
    plugins: [vue(), vueDevTools()],
    server: {
      port,
      strictPort: true,
    },
    resolve: {
      tsconfigPaths: true,
    },
  };
});

import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const BASE_PATH: string = process.env.BASE_PATH || '/v3';
const isProduction: boolean = process.env.NODE_ENV === 'production';
const ALLOWED_HOSTS: string[] = JSON.parse(process.env.ALLOWED_HOSTS || '["*"]');

const config = defineConfig({
  // TODO: enable this once we have versioned static assets
  // build:{
    // assetsDir: ASSETS_DIR || '',
  // },
  base: BASE_PATH,
  server: {
    allowedHosts: ALLOWED_HOSTS,
  },
  plugins: [
    devtools({
      removeDevtoolsOnBuild: isProduction,
    }),
    nitro({
      baseURL: BASE_PATH,
    }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({}),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});

export default config;

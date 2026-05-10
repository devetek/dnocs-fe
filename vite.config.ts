import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';
import { nitro } from 'nitro/vite';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';

const BUILD_DIR: string = process.env.BUILD_DIR || '.output';
const BASE_PATH: string = process.env.BASE_PATH || '/';
const isProduction: boolean = process.env.NODE_ENV === 'production';
const ALLOWED_HOSTS: string[] | true = process.env.ALLOWED_HOSTS
  ? JSON.parse(process.env.ALLOWED_HOSTS || '["*"]')
  : true;

const config = defineConfig({
  build: {
    outDir: BUILD_DIR,
  },
  base: BASE_PATH,
  server: {
    allowedHosts: ALLOWED_HOSTS,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    nitro({
      baseURL: BASE_PATH,
      output: {
        dir: BUILD_DIR,
      },
    }),
    devtools({
      removeDevtoolsOnBuild: isProduction,
    }),
    tailwindcss(),
    tanstackStart({
      router: {
        routesDirectory: './app',
      },
    }),
    viteReact(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
});

export default config;

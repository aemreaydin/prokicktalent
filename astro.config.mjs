import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    markdoc(),
    keystatic(),
  ],
  vite: {
    server: {
      watch: {
        ignored: ['!**/src/content/**'],
      },
    },
  },
});

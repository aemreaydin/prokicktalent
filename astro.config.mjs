import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    keystatic(),
  ],
});

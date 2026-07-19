import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://trafalgar-d-lad.github.io',
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'file'
  }
});

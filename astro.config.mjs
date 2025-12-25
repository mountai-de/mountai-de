// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Dynamische Konfiguration für verschiedene Deployments
// - GitHub Pages: SITE_URL=https://mountai-de.github.io, BASE_PATH=/mountai-de
// - Coolify: SITE_URL=https://gh-pages.mountai.de, BASE_PATH=/
export default defineConfig({
  site: process.env.SITE_URL || 'https://mountai-de.github.io',
  base: process.env.BASE_PATH || '/mountai-de',
  output: 'static',
});

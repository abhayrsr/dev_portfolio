// @ts-check
import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  redirects: {
    '/posts/blogs': '/posts/blogs/1'
  },
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
    ],
  },
  integrations: [react()],
  viewTransitions: true,
  vite: {
    plugins: [tailwindcss()],
  },
});

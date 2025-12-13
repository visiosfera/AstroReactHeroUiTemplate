import node from "@astrojs/node";
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from '@astrojs/react';

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    server: {
      fs: {
        allow: ["../.."],
      },
    },
    plugins: [tailwindcss()],
  },
  integrations: [react()]
});
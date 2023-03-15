import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  experimental: {
    assets: true
   },
   image: {
    service: "astro/assets/services/sharp",
  },
  output: "server",
  adapter: netlify()
});
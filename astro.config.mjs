import { defineConfig } from 'astro/config';
import vercelEdge from '@astrojs/vercel/edge';
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  output: "server",
  adapter: vercelEdge(),
});


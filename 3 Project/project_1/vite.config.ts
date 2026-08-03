import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import cesium from "vite-plugin-cesium";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), cesium()],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },

  server: {
    port: 3050,
  },
});

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const DEFAULT_DEV_APP_PORT = 7270;
const DEFAULT_DEV_API_URL = "https://api.buckle.local";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "src/app",
  base: "./",
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/ui"),
    emptyOutDir: true,
  },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  server: {
    port: Number(process.env.PORT) || DEFAULT_DEV_APP_PORT,
    proxy: {
      "/api": { target: DEFAULT_DEV_API_URL, changeOrigin: true },
    },
  },
});

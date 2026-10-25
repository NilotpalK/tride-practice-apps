import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Tride: served under /proxy/<port>/, so every asset path must be relative
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build", // keep the same output directory as CRA used
  },
  preview: {
    port: 3000,
  },
});




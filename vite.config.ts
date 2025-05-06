import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: "/",
  plugins: [react(), svgr()],
  build: {
    rollupOptions: {
      external: ["firebase-admin"],
    },
  },
  optimizeDeps: {
    include: ["recharts"],
    exclude: ["firebase-admin"],
  },
});

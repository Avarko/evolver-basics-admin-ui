import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../resources/public/admin-ui-assets",
    emptyOutDir: true,
    sourcemap: "inline",
  },
  base: "/admin-ui-assets/",
});

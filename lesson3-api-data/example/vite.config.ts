import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
   plugins: [react()],
   server: {
      port: 5173,
      open: true,
      // Only add proxy for real server mode (not mock mode)
      ...(mode !== 'mock' && {
         proxy: {
            "/api": {
               target: "http://localhost:3001",
               changeOrigin: true,
            },
         },
      }),
   },
   build: {
      outDir: "dist",
      sourcemap: true,
   },
}));

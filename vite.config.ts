import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@nrichardsdev/piko-sdk/react": path.resolve(__dirname, "../../piko-sdk/src/react.ts"),
      "@nrichardsdev/piko-sdk":       path.resolve(__dirname, "../../piko-sdk/src/index.ts"),
    },
  },
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@sections": path.resolve(
        __dirname,
        "./src/components/sectionComponents"
      ),
      "@simpcomp": path.resolve(__dirname, "./src/components/simpleComp"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./public/styles/vars-mixins.scss";`,
      },
    },
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});

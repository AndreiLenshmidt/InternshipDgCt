import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./public/styles/vars.scss";`,
      },
    },
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});

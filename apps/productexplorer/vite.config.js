import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@productexplorer/ui": path.resolve(__dirname, "../../libs/ui/src"),
      "@productexplorer/hooks": path.resolve(__dirname, "../../libs/hooks/src"),
      "@productexplorer/i18n": path.resolve(__dirname, "../../libs/i18n/src"),
    },
  },
});

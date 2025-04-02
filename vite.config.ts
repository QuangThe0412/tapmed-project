import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  define: {
    global: "window",
  },
  plugins: [tailwindcss()],
  server: {
    host: "192.168.1.3",
    port: 3000,
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@dataMockup": path.resolve(__dirname, "./src/dataMockup"),
      "@component": path.resolve(__dirname, "./src/component"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
});

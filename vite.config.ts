import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://codelang.vercel.app",
        changeOrigin: true,
        secure: true,
      },

      // // ✅ добавили прокси для socket.io
      // "/socket.io": {
      //   target: "https://codelang.vercel.app",
      //   changeOrigin: true,
      //   ws: true,
      //   secure: true,
      // },
    },
  },
});
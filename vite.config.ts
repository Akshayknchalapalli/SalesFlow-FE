import react from "@vitejs/plugin-react-swc";
import { type UserConfig, defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import { qrcode } from "vite-plugin-qrcode";

export default defineConfig({
  // envDir: "./env/",
  define: {
    global: "window",
  },

  plugins: [
    react(),
    qrcode(),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  build: {
    sourcemap: true,
    target: "esnext",
    minify: true,
    cssTarget: "esnext",
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react/jsx-runtime", "react-dom"],
        },
      },
    },
  },
}) satisfies UserConfig;

import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"

import { defineConfig as defineViteConfig, mergeConfig } from "vite"
import { defineConfig as defineVitestConfig } from "vitest/config"

// https://vitejs.dev/config/
const viteConfig = defineViteConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    outDir: "build",
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
})

const vitestConfig = defineVitestConfig({
  test: {
    environment: "jsdom",
    globals: true,
    // css: true,
  },
})

export default mergeConfig(viteConfig, vitestConfig)

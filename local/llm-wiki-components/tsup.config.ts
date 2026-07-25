import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm"],
  target: "node22",
  platform: "node",
  outDir: "dist",
  clean: true,
  dts: false,
  splitting: false,
  sourcemap: false,
  external: ["preact", "vfile", "unified", "@quartz/components/types", "quartz"],
  esbuildOptions(options) {
    options.jsx = "automatic"
    options.jsxImportSource = "preact"
  },
})

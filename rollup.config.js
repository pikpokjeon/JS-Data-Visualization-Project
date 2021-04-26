import { nodeResolve } from "@rollup/plugin-node-resolve"
export default {
  input: "./src/index.js",
  plugins: [nodeResolve()],
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
  ],
}
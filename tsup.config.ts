import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  banner: ({ entryPoint }) => {
    if (entryPoint?.endsWith("cli.ts")) {
      return { js: "#!/usr/bin/env node" };
    }
    return {};
  },
});

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "tests",
    passWithNoTests: true,
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["src/types.ts", "src/adapters/base.ts"],
    },
  },
});

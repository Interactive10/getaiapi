import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["deprecated/tests/**/*.test.ts", "src/**/*.test.ts"],
    passWithNoTests: true,
    coverage: {
      include: ["deprecated/src/**/*.ts", "src/**/*.ts"],
      exclude: ["deprecated/src/types.ts", "deprecated/src/adapters/base.ts"],
    },
  },
});

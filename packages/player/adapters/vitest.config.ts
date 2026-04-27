import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.spec.ts"],
    globalSetup: ["src/test/infra-setup.ts"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});

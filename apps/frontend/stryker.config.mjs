export default {
  plugins: ['@stryker-mutator/vitest-runner'],
  testRunner: 'vitest',
  vitest: {
    configFile: 'vitest.config.acceptance.ts',
  },
};
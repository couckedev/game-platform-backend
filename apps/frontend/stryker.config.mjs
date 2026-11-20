export default {
  plugins: ['@stryker-mutator/vitest-runner'],
  testRunner: 'vitest',
  mutate: [
    '!*.spec.ts',
    '**/domain/**/*.ts',
    '**/application/**/*.ts',
    '**/interface-adapters/**/*.ts',
  ],
  vitest: {
    configFile: 'vitest.config.acceptance.ts',
  },
};

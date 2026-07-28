export const strykerConfig = {
  testRunner: 'vitest',
  coverageAnalysis: 'perTest',
  plugins: ['@stryker-mutator/vitest-runner'],
  thresholds: {
    high: 95,
    low: 90,
    break: 90,
  },
  mutate: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!**/*.rejection-reasons.ts',
    '!**/*.error.ts',
  ],
};

module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts?(x)'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./scripts/jest.setup.ts'],
  testMatch: ['**/src/**/*.test.ts?(x)'],
}

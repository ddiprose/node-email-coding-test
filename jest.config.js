module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src/',
  verbose: true,
  coverageReporters: ['text', 'html'],
  coverageDirectory: '../coverage/',
  collectCoverage: true
};

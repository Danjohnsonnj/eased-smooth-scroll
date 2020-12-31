module.exports = {
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
  clearMocks: true,
  verbose: true,
  setupFiles: ['dotenv/config']
}
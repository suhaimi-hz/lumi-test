// const tsPreset = require('ts-jest/jest-preset')
// const puppeteerPreset = require('jest-puppeteer/jest-preset')

module.exports = {
  // ...tsPreset,
  // ...puppeteerPreset,
  preset: 'ts-jest',
  // testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};

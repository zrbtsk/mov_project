/** @type {import('jest').Config} **/

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],// Modules are meant for code which is repeating in each test file
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
      '^.+\\.svg$': 'jest-svg-transformer',
      '^.+\\.(css|scss)$': 'identity-obj-proxy',
      '^swiper/css$': 'identity-obj-proxy',
      '^swiper/css/(.*)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Finds test files named like abc.test|spec.ts?tsx|js|jsx in roots:[] prop.
  testEnvironment: 'jsdom', // To avoid of js DOM errors
  transformIgnorePatterns: [
    // Исключаем node_modules, кроме swiper
    'node_modules/(?!(swiper|ssr-window|dom7|react-markdown)/)',
  ],
};
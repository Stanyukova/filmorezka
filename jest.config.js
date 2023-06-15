const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './src',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/API/Fetching$': path.resolve(__dirname, 'src/API/Fetching.ts'), 
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  // ... existing configurations ...

  moduleDirectories: ["node_modules", "<rootDir>"],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/app/_components/(.*)$': '<rootDir>/app/_components/$1'
  },

  // ... existing configurations ...

  testEnvironment: "jsdom",

  // ... existing configurations ...
};

export default async () => {
  const jestConfig = await createJestConfig(config)();

  return {
    ...jestConfig,
    setupFilesAfterEnv: [
      ...jestConfig.setupFilesAfterEnv || [],
      '@testing-library/jest-dom',
    ],
  };
};

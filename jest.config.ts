import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
    testMatch: [
        "**/tests/**/*.test.ts"
    ],
      moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

export default config;
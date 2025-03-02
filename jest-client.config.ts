import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const clientConfig: Config = {
  displayName: 'client',
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '<rootDir>/src/app/components/*.spec.tsx',
    '<rootDir>/src/app/components/*.spec.ts',
  ],
}

export default createJestConfig(clientConfig)
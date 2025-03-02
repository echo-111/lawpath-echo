import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const serverConfig: Config = {
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/app/api/**/*.int.spec.ts',
  ],
}

export default createJestConfig(serverConfig)
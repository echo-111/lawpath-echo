import type { Config } from 'jest';
import { resolve } from 'path';

const rootDir = resolve(__dirname);

const config: Config = {
  rootDir,
  projects: [
    // resolve(rootDir, 'jest-client.config.ts'),
    resolve(rootDir, 'jest-server.config.ts'),
  ]
};

export default config;

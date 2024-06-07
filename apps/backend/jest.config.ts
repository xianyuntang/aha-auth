import dotenv from 'dotenv';
import path from 'path';

import { PROJECT_ROOT } from './src/app';

dotenv.config({
  path: path.resolve(PROJECT_ROOT, `.env.test`),
});

/* eslint-disable */
export default {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/backend',
};

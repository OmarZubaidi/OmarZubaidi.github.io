import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  collectCoverage: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': ['ts-jest', { diagnostics: { ignoreCodes: ['TS151001'] } }], // suppresses ts-jest import warning
    ...tsJestTransformCfg,
  },
};

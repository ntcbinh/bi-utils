import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

export const transform = {
  ...tsJestTransformCfg,
};

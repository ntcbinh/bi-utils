/**
 * Clamp a number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

/**
 * Round to X decimals
 */
export const round = (value: number, decimals: number = 0): number => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

/**
 * Random number between min and max
 */
export const random = (min: number = 0, max: number = 1): number => Math.random() * (max - min) + min;

/**
 * Check if value is integer
 */
export const isInteger = (value: unknown): value is number => typeof value === 'number' && Number.isInteger(value);

/**
 * Fix floating-point issues (0.1 + 0.2 === 0.3)
 */
export const toFixedNumber = (value: number, decimals: number = 0): number => {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

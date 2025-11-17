/**
 * Remove duplicate values from an array.
 * @example
 * unique([1, 2, 2, 3]); // [1, 2, 3]
 */
export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

/**
 * Split array into chunks of given size.
 * @example
 * chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
 */
export const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

/**
 * Flatten nested arrays.
 * @example
 * flatten([1, [2, [3, 4]]]); // [1,2,3,4]
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flatten = (arr: any[]): any[] =>
  arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []);

/**
 * Group items in an array by a key function.
 * @example
 * groupBy([{role:'a'},{role:'b'}], x=>x.role);
 */
export const groupBy = <T>(arr: T[], fn: (item: T) => string | number) =>
  arr.reduce(
    (acc, item) => {
      const key = fn(item);
      (acc[key] ||= []).push(item);
      return acc;
    },
    {} as Record<string | number, T[]>,
  );

/**
 * Sum values in array based on a transform function.
 * @example
 * sumBy([{v:1},{v:2}], x=>x.v); // 3
 */
export const sumBy = <T>(arr: T[], fn: (item: T) => number): number => arr.reduce((sum, item) => sum + fn(item), 0);

/**
 * Calculate average of number array.
 * @example
 * average([2,4,6]); // 4
 */
export const average = (arr: number[]): number => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

/**
 * Remove falsy values from array.
 * @example
 * compact([0,1,false,2]); // [1,2]
 */
export const compact = <T>(arr: T[]): T[] => arr.filter(Boolean);

/**
 * Get first element.
 * @example
 * first([1,2,3]); // 1
 */
export const first = <T>(arr: T[]): T | undefined => arr[0];

/**
 * Get last element.
 * @example
 * last([1,2,3]); // 3
 */
export const last = <T>(arr: T[]): T | undefined => (arr.length ? arr[arr.length - 1] : undefined);

/**
 * Generate range from start to end (inclusive).
 * @example
 * range(1,5); // [1,2,3,4,5]
 */
export const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

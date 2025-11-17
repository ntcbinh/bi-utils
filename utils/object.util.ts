/**
 * Pick object keys
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = ['a', 'b'];
 * const picked = pick(obj, keys);
 * // => { a: 1, b: 2 }
 * ```
 * @returns {Pick<T, K>}
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> =>
  Object.fromEntries(keys.map((k) => [k, obj[k]])) as Pick<T, K>;

/**
 * Omit object keys
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const keys = ['a', 'b'];
 * const omitted = omit(obj, keys);
 * // => { c: 3 }
 * ```
 * @returns {Omit<T, K>}
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = {} as Omit<T, K>;
  for (const key in obj) {
    if (!keys.includes(key as unknown as K)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (result as any)[key] = obj[key];
    }
  }
  return result;
};

/**
 * Get object value by path
 * @example
 * ```ts
 * const obj = { a: { b: { c: 3 } } };
 * const value = get(obj, 'a.b.c');
 * // => 3
 * ```
 * @returns {unknown}
 */
export const get = (obj: unknown, path: string, fallback?: unknown): unknown =>
  path.split('.').reduce((acc, key) => (acc as Record<string, unknown>)?.[key], obj) ?? fallback;

/**
 * Set object value by path
 * ```ts
 * const obj = {};
 * set(obj, 'user.profile.name', 'Alice');
 * // => { user: { profile: { name: 'Alice' } } }
 * ```
 */
export const set = (obj: Record<string, unknown>, path: string, value: unknown) => {
  const keys = path.split('.');
  let cur = obj;

  for (const key of keys.slice(0, -1)) {
    if (!cur[key]) cur[key] = {};
    cur = cur[key] as Record<string, unknown>;
  }

  cur[keys[keys.length - 1]] = value;
  return obj;
};

/**
 * Check an input is object or not
 * @example
 * ```ts
 * isObject({});       // true
 * isObject([]);       // false
 * isObject(null);     // false
 * isObject("hello");  // false
 * ```
 */
export const isObject = (x: unknown): x is object => x !== null && typeof x === 'object' && !Array.isArray(x);

/**
 * Merge config, theme, options... (array|object|...)
 * @example
 * ```ts
 * const defaults = {
 *   theme: {
 *     colors: { primary: "blue", secondary: "gray" },
 *     darkMode: false
 *   }
 * };
 *
 * const custom = {
 *   theme: {
 *     colors: { primary: "red" }
 *   }
 * };
 *
 * deepMerge(defaults, custom);
 * // {
 * //   theme: {
 * //     colors: { primary: 'red', secondary: 'gray' },
 * //     darkMode: false
 * //   }
 * // }
 * ```
 */
export const deepMerge = (a: unknown, b: unknown): unknown => {
  if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b];
  if (isObject(a) && isObject(b)) return mergeObjects(a as Record<string, unknown>, b as Record<string, unknown>);
  return b === undefined ? a : b;
};

/**
 * Clone an object
 * @example
 * ```ts
 * const a = { x: 1, y: { z: 2 } };
 * const b = deepClone(a);
 * b.y.z = 10;
 *
 * console.log(a.y.z); // 2
 *
 * ```
 */
export const deepClone = <T>(obj: T): T => structuredClone(obj);

/**
 * Get all keys of an object
 * @example
 * ```ts
 * const user = { id: 1, name: "Alice" };
 * const k = keys(user);
 * // type k = ("id" | "name")[]
 * ```
 */
export const keys = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>;

// private functions
const mergeObjects = (objA: Record<string, unknown>, objB: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(objA)) {
    result[key] = key in objB ? deepMerge(objA[key], objB[key]) : objA[key];
  }

  for (const key of Object.keys(objB)) {
    if (!(key in objA)) result[key] = objB[key];
  }

  return result;
};

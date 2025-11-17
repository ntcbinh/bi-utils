import { pick, omit, get, set, isObject, deepMerge, deepClone, keys } from '../utils';

describe('pick()', () => {
  it('should pick selected keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a', 'b']);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should ignore keys not in obj', () => {
    const obj = { a: 1 };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = pick(obj, ['a', 'x' as any]);
    expect(result).toEqual({ a: 1, x: undefined });
  });
});

describe('omit()', () => {
  it('should omit selected keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['a', 'b']);
    expect(result).toEqual({ c: 3 });
  });

  it('should return same object when keys empty', () => {
    const obj = { a: 1 };
    const result = omit(obj, []);
    expect(result).toEqual({ a: 1 });
  });
});

describe('get()', () => {
  it('should get nested value', () => {
    const obj = { a: { b: { c: 3 } } };
    expect(get(obj, 'a.b.c')).toBe(3);
  });

  it('should return fallback if path invalid', () => {
    const obj = { a: { b: {} } };
    expect(get(obj, 'a.b.c', 'fallback')).toBe('fallback');
  });
});

describe('set()', () => {
  it('should set nested value', () => {
    const obj: Record<string, unknown> = {};

    set(obj, 'user.profile.name', 'Alice');
    expect(obj).toEqual({
      user: { profile: { name: 'Alice' } },
    });
  });

  it('should override existing value', () => {
    const obj = { a: { b: 1 } };
    set(obj, 'a.b', 5);
    expect(obj.a.b).toBe(5);
  });
});

describe('isObject()', () => {
  it('should return true for plain object', () => {
    expect(isObject({})).toBe(true);
  });

  it('should return false for array', () => {
    expect(isObject([])).toBe(false);
  });

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('should return false for primitive types', () => {
    expect(isObject('hello')).toBe(false);
    expect(isObject(123)).toBe(false);
  });
});

describe('deepMerge()', () => {
  it('should merge nested objects', () => {
    const defaults = {
      theme: {
        colors: { primary: 'blue', secondary: 'gray' },
        darkMode: false,
      },
    };

    const custom = {
      theme: {
        colors: { primary: 'red' },
      },
    };

    const result = deepMerge(defaults, custom);

    expect(result).toEqual({
      theme: {
        colors: { primary: 'red', secondary: 'gray' },
        darkMode: false,
      },
    });
  });

  it('should merge arrays by concatenation', () => {
    const a = [1, 2];
    const b = [3, 4];
    expect(deepMerge(a, b)).toEqual([1, 2, 3, 4]);
  });

  it('should replace primitive values', () => {
    expect(deepMerge(1, 2)).toBe(2);
  });

  it('should keep original value if new is undefined', () => {
    expect(deepMerge(1, undefined)).toBe(1);
  });
});

describe('deepClone()', () => {
  it('should deep clone object', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);

    cloned.b.c = 99;

    expect(obj.b.c).toBe(2); // not mutated
    expect(cloned.b.c).toBe(99);
  });
});

describe('keys()', () => {
  it('should return correct typed keys', () => {
    const obj = { id: 1, name: 'A' };
    const k = keys(obj);
    expect(k).toEqual(['id', 'name']);
  });
});

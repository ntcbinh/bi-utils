import { isEmpty, isEmail, isNumeric } from '../utils';

describe('Validation Utils', () => {
  test('isEmpty', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  test('isEmail', () => {
    expect(isEmail('a@mail.com')).toBe(true);
    expect(isEmail('invalid')).toBe(false);
  });

  test('isNumeric', () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('abc')).toBe(false);
  });
});

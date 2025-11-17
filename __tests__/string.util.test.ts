import { toKebabCase, toCamelCase, capitalize, truncate } from '../utils';

describe('String Utils', () => {
  test('toKebabCase', () => {
    expect(toKebabCase('HelloWorld Test')).toBe('hello-world-test');
  });

  test('toCamelCase', () => {
    expect(toCamelCase('hello-world-test')).toBe('helloWorldTest');
  });

  test('capitalize', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('truncate', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
    expect(truncate('Hi', 5)).toBe('Hi');
  });
});

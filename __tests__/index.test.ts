import { add } from '../index';

describe('add function', () => {
  test('should add two numbers correctly', () => {
    expect(add(1, 2)).toBe(3);
  });
});

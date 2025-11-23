import { average, clamp, isInteger, random, round, toFixedNumber } from '../utils';

describe('Number Utilities', () => {
  // clamp
  test('clamp: should clamp value inside range', () => {
    expect(clamp(5, 1, 10)).toBe(5);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(20, 0, 10)).toBe(10);
  });

  // round
  test('round: should round number with decimals', () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2355, 2)).toBe(1.24);
    expect(round(10.5)).toBe(11);
  });

  // isInteger
  test('isInteger: detects integer correctly', () => {
    expect(isInteger(10)).toBe(true);
    expect(isInteger(10.1)).toBe(false);
    expect(isInteger('10')).toBe(false);
  });

  // random
  test('random: returns value within range', () => {
    const value = random(1, 5);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(5);
  });

  // average
  test('average: should calculate avg correctly', () => {
    expect(average([1, 2, 3])).toBe(2);
    expect(average([])).toBe(0);
  });

  // toFixedNumber
  test('toFixedNumber: should round but return number', () => {
    expect(toFixedNumber(1.2345, 2)).toBe(1.23);
    expect(toFixedNumber(1.2399, 2)).toBe(1.24);
    expect(typeof toFixedNumber(1.2399, 2)).toBe('number');
  });
});

import { isValidDate, addDays, formatDate, daysBetween } from '../utils';

describe('Date Utils', () => {
  test('isValidDate', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate('invalid')).toBe(false);
  });

  test('addDays', () => {
    const d = new Date(2025, 0, 1);
    const newD = addDays(d, 5);
    expect(newD.getDate()).toBe(6);
  });

  test('formatDate', () => {
    const d = new Date('2025-01-01');
    expect(formatDate(d)).toBe('01/01/2025'); // theo locale vi-VN
  });

  test('daysBetween', () => {
    const d1 = new Date('2025-01-01');
    const d2 = new Date('2025-01-06');
    expect(daysBetween(d1, d2)).toBe(5);
  });
});

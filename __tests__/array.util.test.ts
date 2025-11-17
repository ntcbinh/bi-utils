import { chunk, unique, flatten, groupBy, sumBy, average, compact, first, last, range } from '../utils';

describe('Array util test', () => {
  test('chunk', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('unique', () => {
    expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  test('flatten', () => {
    expect(flatten([1, [2, [3, 4]]])).toEqual([1, 2, 3, 4]);
  });

  test('groupBy', () => {
    const data = [{ role: 'a' }, { role: 'b' }, { role: 'a' }];
    expect(groupBy(data, (x) => x.role)).toEqual({ a: [{ role: 'a' }, { role: 'a' }], b: [{ role: 'b' }] });
  });

  test('sumBy', () => {
    expect(sumBy([{ v: 1 }, { v: 2 }], (x) => x.v)).toBe(3);
  });

  test('average', () => {
    expect(average([2, 4, 6])).toBe(4);
    expect(average([])).toBe(0);
  });

  test('compact', () => {
    expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
  });

  test('first', () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first([])).toBeUndefined();
  });

  test('last', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([])).toBeUndefined();
  });

  test('range', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });
});

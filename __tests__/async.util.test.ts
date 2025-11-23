import {
  sleep,
  retry,
  timeout,
  to,
  debounceAsync,
  queueAsync,
  raceTimeout,
  retryWithBackoff,
  throttleAsync,
  limit,
  memoizeAsync,
} from '../utils';

describe('Async Utils', () => {
  jest.setTimeout(10000);

  test('sleep', async () => {
    const start = Date.now();
    await sleep(100);
    expect(Date.now() - start).toBeGreaterThanOrEqual(100);
  });

  test('retry', async () => {
    let count = 0;
    const fn = jest.fn(async () => {
      count++;
      if (count < 3) throw new Error('fail');
      return 'ok';
    });
    await expect(retry(fn, 3, 10)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('timeout', async () => {
    await expect(timeout(new Promise((res) => setTimeout(res, 50)), 100)).resolves.toBeUndefined();
    await expect(timeout(new Promise((res) => setTimeout(res, 100)), 50)).rejects.toBe('Timeout');
  });

  test('to', async () => {
    const [err1, res1] = await to(Promise.resolve(5));
    expect(err1).toBeNull();
    expect(res1).toBe(5);

    const [err2, res2] = await to(Promise.reject(new Error('fail')));
    expect(err2).toBeInstanceOf(Error);
    expect(res2).toBeNull();
  });

  test('retryWithBackoff succeeds', async () => {
    let count = 0;
    const fn = jest.fn(async () => {
      if (count++ < 1) throw 'fail';
      return 'done';
    });
    const result = await retryWithBackoff(fn, 3, 10);
    expect(result).toBe('done');
  });

  test('raceTimeout returns fast result', async () => {
    const fast = Promise.resolve(42);
    const res = await raceTimeout(fast, 100);
    expect(res).toEqual({ data: 42, timedOut: false });
  });

  test('raceTimeout triggers timeout', async () => {
    const slow = new Promise((res) => setTimeout(res, 200));
    const res = await raceTimeout(slow, 50);
    expect(res.timedOut).toBe(true);
  });

  test('debounceAsync delays execution', async () => {
    const fn = jest.fn(async () => 'ok');
    const debounced = debounceAsync(fn, 50);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();
    await sleep(60);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('throttleAsync limits calls', async () => {
    const fn = jest.fn(async () => 'x');
    const throttled = throttleAsync(fn, 100);

    throttled();
    throttled();
    throttled();

    await sleep(10);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('queueAsync runs with concurrency=1', async () => {
    const q = queueAsync(1);
    const order: number[] = [];

    const task = (id: number) =>
      q(async () => {
        order.push(id);
        await sleep(20);
        return id;
      });

    await Promise.all([task(1), task(2), task(3)]);
    expect(order).toEqual([1, 2, 3]);
  });

  test('limit runs functions in parallel up to max', async () => {
    const l = limit(2);
    let running = 0;
    let maxRunning = 0;

    const task = () =>
      l(async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await sleep(30);
        running--;
      });

    await Promise.all([task(), task(), task(), task()]);
    expect(maxRunning).toBe(2);
  });

  test('memoizeAsync caches results', async () => {
    let count = 0;
    const fn = jest.fn(async (n: number) => {
      count++;
      return n * 2;
    });

    const memo = memoizeAsync(fn);

    const r1 = await memo(5);
    const r2 = await memo(5);

    expect(r1).toBe(10);
    expect(r2).toBe(10);
    expect(count).toBe(1);
  });
});

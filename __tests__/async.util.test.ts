import { sleep, retry, timeout, to } from '../utils';

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
});

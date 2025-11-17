export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const retry = async <T>(fn: () => Promise<T>, attempts = 3, delay = 200): Promise<T> => {
  try {
    return await fn();
  } catch (err) {
    if (attempts <= 1) throw err;
    await sleep(delay);
    return retry(fn, attempts - 1, delay);
  }
};

export const timeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([promise, new Promise<T>((_, reject) => setTimeout(() => reject('Timeout'), ms))]);

export const to = async <T>(promise: Promise<T>): Promise<[Error | null, T | null]> => {
  try {
    return [null, await promise];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return [err, null];
  }
};

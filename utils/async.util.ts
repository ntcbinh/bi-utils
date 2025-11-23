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

export const retryWithBackoff = async <T>(fn: () => Promise<T>, attempts = 3, baseDelay = 300): Promise<T> => {
  let err: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      err = e;
      await sleep(baseDelay * Math.pow(2, i));
    }
  }
  throw err;
};

export const raceTimeout = async <T>(promise: Promise<T>, ms: number): Promise<{ data?: T; timedOut: boolean }> => {
  let timer: NodeJS.Timeout | undefined = undefined;
  const timeoutPromise = new Promise<{ timedOut: boolean }>((resolve) => {
    timer = setTimeout(() => resolve({ timedOut: true }), ms);
  });

  const result = await Promise.race([promise.then((data) => ({ data, timedOut: false })), timeoutPromise]);
  clearTimeout(timer);
  return result;
};

export const debounceAsync = <T extends (...args: unknown[]) => Promise<unknown>>(fn: T, delay: number) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  let pending: Promise<unknown> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timer) clearTimeout(timer);

    pending = new Promise((resolve) => {
      timer = setTimeout(async () => {
        const result = await fn(...args);
        resolve(result);
      }, delay);
    });

    return pending as Promise<ReturnType<T>>;
  };
};

export const throttleAsync = <T extends (...args: unknown[]) => Promise<unknown>>(fn: T, delay: number) => {
  let lastCall = 0;
  let pending: Promise<unknown> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      pending = fn(...args);
    }
    return pending as Promise<ReturnType<T>>;
  };
};

export const queueAsync = (concurrency: number) => {
  let running = 0;
  const queue: Array<() => void> = [];

  const runNext = () => {
    if (running >= concurrency || queue.length === 0) return;
    const task = queue.shift()!;
    running++;
    task();
  };

  return <T>(fn: () => Promise<T>): Promise<T> =>
    new Promise((resolve, reject) => {
      const exec = () => {
        fn()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            running--;
            runNext();
          });
      };

      queue.push(exec);
      runNext();
    });
};

export const limit = (max: number) => {
  const queue = queueAsync(max);
  return <T>(fn: () => Promise<T>) => queue(fn);
};

export const repeat = async <T>(fn: () => Promise<T>, interval: number, times?: number) => {
  let count = 0;
  while (true) {
    await fn();
    count++;
    if (times && count >= times) break;
    await sleep(interval);
  }
};

export const retryForever = async <T>(fn: () => Promise<T>, delay: number) => {
  while (true) {
    try {
      return await fn();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      await sleep(delay);
    }
  }
};

export const memoizeAsync = <Args extends unknown[], R>(fn: (...args: Args) => Promise<R>) => {
  const cache = new Map<string, Promise<R>>();

  return (...args: Args): Promise<R> => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key)!;
  };
};

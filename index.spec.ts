// Simulate a function that requires 3 secs to complete (e.g. a heavy db query)
import DataCache from './index';

const sleep = (min: number) => {
  return new Promise((res, rej) => {
    setTimeout(() => res(), min * 60 * 1000);
  })
}


describe('Data cache', () => {
  let cache: DataCache<Array<number>> = null;
  let dataFetcher: jest.Mock<Promise<Array<number>>>;
  beforeEach(() => {
    dataFetcher = jest.fn((): Promise<Array<number>> => {
      return new Promise((res, rej) => {
        setTimeout(() => res([1, 2, 3, 4, 5]), 100);
      });
    });
    cache = new DataCache<Array<number>>(dataFetcher);
  });
  test('Retrieve data correctly', async () => {
    let numbers = await cache.getData();
    expect(numbers).toStrictEqual([1, 2, 3, 4, 5]);
    numbers = await cache.getData();
    expect(numbers).toStrictEqual([1, 2, 3, 4, 5]);
  });
  test('Use cache correctly', async () => {
    await cache.getData();
    await cache.getData();
    await cache.getData();
    await cache.getData();
    await cache.getData();
    expect(dataFetcher).toHaveBeenCalledTimes(1);
  });
  test('Cache invalidation', async () => {
    await cache.getData();
    await cache.getData();
    await cache.invalidateCache();
    await cache.getData();
    await cache.getData();
    await cache.getData();
    expect(dataFetcher).toHaveBeenCalledTimes(2);
  });
  test('TTL', async () => {
    cache = new DataCache<Array<number>>(dataFetcher, 1/60);
    await cache.getData();
    await cache.getData();
    await cache.getData();
    expect(dataFetcher).toHaveBeenCalledTimes(1);
    await sleep(1/60);
    await cache.getData();
    await cache.getData();
    expect(dataFetcher).toHaveBeenCalledTimes(2);
  });
});

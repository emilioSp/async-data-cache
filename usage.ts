import DataCache from './index';

// Simulate a function that requires 3 secs to complete (e.g. a heavy db query)
const dataFetcher = (): Promise<Array<number>> => {
  console.log('dataFetcher');
  return new Promise((res, rej) => {
    setTimeout(() => res([1, 2, 3, 4, 5]), 3000);
  })
}

(async () => {
  // With the cache the dataFetcher function will be called only 1 time.
  const cache = new DataCache<Array<number>>(dataFetcher);
  let data = await cache.getData();
  console.log(data);
  data = await cache.getData();
  console.log(data);
  data = await cache.getData();
  console.log(data);
  data = await cache.getData();
  console.log(data);
})();
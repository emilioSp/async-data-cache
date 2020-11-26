# async-data-cache
![license](https://img.shields.io/npm/l/async-data-cache)
![version](https://img.shields.io/npm/v/async-data-cache)
![security](https://img.shields.io/snyk/vulnerabilities/github/emiliosp/async-data-cache)
![CI](https://github.com/emilioSp/async-data-cache/workflows/CI/badge.svg)
![keyword](https://img.shields.io/badge/keyword-performance-blue)
![keyword](https://img.shields.io/badge/keyword-cache-blue)

A simple async data cache with __no dependencies__.

This library allows your to cache the result of an async call. 

It's useful when you have to call an api or execute a heavy query and the performance are more important than the real-time.
You can easily choose the cache time to live (ttl).

## Installation
```
yarn add async-data-cache
```

## Usage
```node
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
```

To change the ttl, pass the ttl minutes to the DataCache constructor
```node
// 1 hour of ttl
const cache = new DataCache<Array<number>>(dataFetcher, 60);
```

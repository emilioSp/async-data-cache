class DataCache<T> {
  private millisecondsToLive: number;
  private fetchFunction: () => Promise<T>;
  private cache: T | null;
  private fetchTime: number;

  constructor(fetchFunction: () => Promise<T>, ttlMinutes: number = 2) {
    this.millisecondsToLive = ttlMinutes * 60 * 1000;
    this.fetchFunction = fetchFunction;
    this.cache = null;
    this.fetchTime = Date.now();
  }

  isCacheExpired() {
    return this.fetchTime + this.millisecondsToLive < Date.now();
  }

  async getData(): Promise<T> {
    if (!this.cache || this.isCacheExpired()) {
      this.cache = await this.fetchFunction();
      this.fetchTime = Date.now();
      return this.cache;
    }

    return this.cache;
  }
}

export { DataCache };
export default DataCache;
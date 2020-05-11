const NodeCache = require('node-cache');

class CacheHelpers {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key) {
    const value = this.cache.get(key);
    return value;

    // if (value) {
    //   return Promise.resolve(value);
    // }
  }

  set(key, data) {
    this.cache.set(key, data);
    console.log(key, '.... ', data);
  }


  del(keys) {
    this.cache.del(keys);
  }

  delStartWith(startStr = '') {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }
}


module.exports =  CacheHelpers;
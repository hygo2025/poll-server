import NodeCache from 'node-cache'

class Cache {
  constructor() {
    this.cache = new NodeCache({ useClones: true })
  }

  get(key, noCacheCallback) {
    if (!key) {
      return Promise.resolve()
    }

    const value = this.cache.get(key)
    if (value) {
      return Promise.resolve(value)
    }

    return noCacheCallback().then(result => {
      this.cache.set(key, result.value, result.ttl)
      return result.value
    })
  }

  del(keys) {
    this.cache.del(keys)
  }

  flush() {
    this.cache.flushAll()
  }
}

export default Cache

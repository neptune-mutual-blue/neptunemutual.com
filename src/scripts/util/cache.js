import {
  del,
  get,
  set
} from 'idb-keyval'

const cache = async (data, key, expires) => {
  const value = {
    expires,
    data
  }

  await set(key, JSON.stringify(value))
}

const emptyCache = async (key) => {
  await del(key)
}

const fromCache = async (key) => {
  const content = await get(key)

  if (content) {
    const { data, expires } = JSON.parse(content)

    if (expires < new Date().getTime()) {
      console.debug('Cache expired')
      await emptyCache(key)
    }

    return data
  }

  return null
}

export { cache, emptyCache, fromCache }

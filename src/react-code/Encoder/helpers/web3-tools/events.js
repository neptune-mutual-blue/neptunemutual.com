import { Fragment, id } from 'ethers/lib/utils'

const getEventFragment = (str) => {
  const frag = Fragment.from(str)

  if (frag.type === 'event') {
    return frag
  }

  throw Error(`Invalid event ${str}`)
}

const getEventTopic = (str) => {
  return id(getEventFragment(str).format())
}

const getArgs = (iface, log) => {
  try {
    const args = iface.parseLog(log).args

    const parsedArgs = {}
    Object.entries(args).forEach(([key, value]) => {
      if (!isNaN(key)) {
        return
      }

      if (value._isBigNumber) {
        parsedArgs[key] = value.toString()
      } else if (Array.isArray(value)) {
        value = value.map(v => (v.toString()))
        parsedArgs[key] = JSON.stringify(value)
      } else if (typeof value === 'object') {
        parsedArgs[key] = JSON.stringify(value)
      } else {
        parsedArgs[key] = value
      }
    })

    return parsedArgs
  } catch (error) {
    console.error(error)
  }

  return ''
}

const getBlockTimestamp = async (library, blockNumber) => {
  try {
    const block = await library.getBlock(blockNumber)
    return block.timestamp
  } catch (error) {
    console.error(error)
  }

  return ''
}

export {
  getEventTopic,
  getArgs,
  getBlockTimestamp
}

import { parseBytes32String } from '@ethersproject/strings'

import { getMonthName } from './date'

const bytes32ToString = (bytes32Str: string): string => {
  try {
    return parseBytes32String(bytes32Str)
  } catch (error) {
    console.error(error)
  }

  return ''
}

const getKeyValuePairFrom = (cxTokens: CxToken[], status: 'active' | 'expired'): Array<KeyValuePair<string>> => {
  const items = (cxTokens ?? [])
    .filter(x => status === 'active'
      ? parseInt(x.expiry) * 1000 > new Date().getTime()
      : parseInt(x.expiry) * 1000 <= new Date().getTime()
    )

  return items
    .map(x => ({
      key: [bytes32ToString(x.coverKey), bytes32ToString(x.productKey), getMonthName(x.expiry)]
        .filter(y => y !== '')
        .join(':'),
      value: x.value
    }))
}

export { bytes32ToString, getKeyValuePairFrom }

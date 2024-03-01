import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 99, DECIMAL_PLACES: 50 })

const definition: Record<EthereumUnit, number> = {
  kWei: 3,
  mWei: 6,
  gWei: 9,
  szabo: 12,
  finney: 15,
  ether: 18,
  kEther: 21,
  mEther: 24,
  gEther: 27,
  tEther: 30
}

const getPowerValue = (unit: EthereumUnit): number => {
  const power = definition[unit]

  if (power === undefined) {
    return 0
  }

  return power
}

const convertFromWei = (to: EthereumUnit, x: (string | number)): string => {
  const power = getPowerValue(to)
  const value = new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(power)).toString()
  return value
}

const convertToWei = (from: EthereumUnit, x: (string | number)): string => {
  const power = getPowerValue(from)
  const value = new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(power)).toString()
  return value
}

export { convertFromWei, convertToWei }

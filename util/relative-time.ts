/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
 * @return {string} Human readable elapsed or remaining time
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/67338038/938822
 */

const getDateFromUnix = (unix: number): Date => {
  return new Date(unix * 1000)
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

const units: Array<{
  unit: Intl.RelativeTimeFormatUnit
  divisor: number
}> = [
  {
    unit: 'year',
    divisor: YEAR
  },
  {
    unit: 'month',
    divisor: MONTH
  },
  {
    unit: 'week',
    divisor: WEEK
  },
  {
    unit: 'day',
    divisor: DAY
  },
  {
    unit: 'hour',
    divisor: HOUR
  },
  {
    unit: 'minute',
    divisor: MINUTE
  },
  {
    unit: 'second',
    divisor: SECOND
  }
]

const fromNow = (date: number | string | Date): string => {
  if (!date) {
    return ''
  }

  if (typeof date === 'string' && parseInt(date) === 0) {
    return 'Not available'
  }

  if (!(date instanceof Date) && ['string', 'number'].includes(typeof date)) {
    date = getDateFromUnix(Number(date))
  }

  const diff =
    Date.now() - (typeof date === 'object' ? date : new Date(date)).getTime()
  const diffAbs = Math.abs(diff)

  const matchedUnit = units.find(unit => (diffAbs / unit.divisor) >= 1)

  if (matchedUnit) {
    const { divisor, unit } = matchedUnit
    let value = Math.round(diff / divisor)
    value = value > 0 ? -1 * value : Math.abs(value)

    const rtf = new Intl.RelativeTimeFormat('en', {
      numeric: 'auto'
    })

    return rtf.format(value, unit)
  }

  return 'just now'
}

export { fromNow }

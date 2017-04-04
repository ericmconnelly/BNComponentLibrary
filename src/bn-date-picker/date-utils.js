import moment from 'moment'

export function allDaysDisabledAfter (day, unit, max_date) {
  return max_date && day.clone().add(1, unit).isAfter(max_date, unit)
}

export function allDaysDisabledBefore (day, unit, min_date) {
  return min_date && day.clone().subtract(1, unit).isBefore(min_date, unit)
}

export function isDayDisabled (day, min_date, max_date) {
  const before = min_date && min_date.clone().startOf('day').subtract(1, 'seconds')
  const after = max_date && max_date.clone().startOf('day').add(1, 'seconds')

  return !before || !after ? false : !day.isBetween(before, after)
}

export function isDayInRange (day, start_date, end_date) {
  const before = start_date && start_date.clone().startOf('day').subtract(1, 'seconds')
  const after = end_date && end_date.clone().startOf('day').add(1, 'seconds')
  return !before || !after ? false : day.clone().startOf('day').isBetween(before, after)
}

export function isSameDay (moment1, moment2) {
  return  !moment1 || !moment2 ? moment1 === moment2 : moment1.isSame(moment2, 'day')
}

export function isSameUtcOffset (moment1, moment2) {
  return !moment1 || !moment2 ? moment1 === moment2 : moment1.utcOffset() === moment2.utcOffset()
}

export function localizeMoment(date, locale = moment.locale()) {
  return date.clone().locale(locale)
}

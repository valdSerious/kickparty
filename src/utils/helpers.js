import moment from 'moment'
import crossBrowser from './crossBrowser'

const helpers = {}

// date param Date()
// time string '12:30'
helpers.mergeDateTime = (date, time) => {
  // [Firefox Hack] Firefox does not support a time input
  time = crossBrowser.ffTime(time)

  if (date && time) {
    const timeParts = time.split(':')
    const isPM = (time.indexOf('PM') !== -1)
    const timeHour = ~~timeParts[0] + (isPM ? 12 : 0)
    const timeMinute = ~~timeParts[1].substring(0, 2)

    // Take the year, month, and date of the date field
    // Take the hour and minutes of the time field
    // Merge them together in a UTC date
    return moment.utc([
      date.getFullYear(), date.getMonth(), date.getDate(),
      timeHour, timeMinute, 0, 0
    ]).toDate()
  } else if (date) {
    return moment.utc([
      date.getFullYear(), date.getMonth(), date.getDate()
    ]).toDate()
  } else {
    return null
  }
}

helpers.unmergeDateTime = (datetime) => {
  if (datetime) {
    // Create a JS Date from the moment's year, month, and date
    // Create a 24-hour String from the moment's hours and minutes
    const m = moment.utc(datetime)
    const date = new Date(m.year(), m.month(), m.date())
    const hours = m.hours() < 10 ? `0${m.hours()}` : `${m.hours()}`
    const minutes = m.minutes() < 10 ? `0${m.minutes()}` : `${m.minutes()}`

    return {
      date: date,
      time: `${hours}:${minutes}`
    }
  } else {
    return {
      date: null,
      time: '0:00'
    }
  }
}

helpers.initDateObject = (dateString) => {
  const timestamp = Date.parse(dateString)
  let newDate

  if (isNaN(timestamp)) {
    newDate = false
  } else {
    newDate = new Date(dateString)
  }

  return newDate
}

helpers.getPercentOf = (percentage, val) => {
  return Math.round((val * percentage) * 100) / 100
}

helpers.getCreditCardType = (num) => {
  switch (num) {
    case 3:
      return 'American Express'
    case 4:
      return 'Visa'
    case 5:
      return 'MasterCard'
    case 6:
      return 'Discover'
    default:
      return 'Unknown Payment Type'
  }
}

export default helpers

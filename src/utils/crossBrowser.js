export default {
  ffTime (time) {
    // [Firefox Hack] Firefox does not support a time input
    // Converts it into a 24 hour string
    if (time.toLowerCase().indexOf('am')) {
      // strip off the am/AM and remove whitespace if there
      time = time.replace(/\s?am/gi, '')
    } else if (time.toLowerCase().indexOf('pm')) {
      // strip off the pm/PM and remove whitespace if there
      time = time.replace(/\s?am|pm/gi, '')
      const timeParts = time.split(':')
      const updatedHours = ~~timeParts[0] + 12
      time = `${updatedHours}:${timeParts[1]}`
    }

    return time
  }
}

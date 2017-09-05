const COOKIES_PAST = '21 Apr 1980 12:00:00 UTC'

export default class CookieStorage {
  constructor () {
    this.isSupported = this.checkSupport()
  }

  get (key) {
    const cookies = document.cookie.split(';')
    const name = `${key}=`

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i]

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1)
      }

      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length)
      }
    }

    return ''
  }

  set (key, val) {
    const expDays = 60
    const d = new Date()
    d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000))
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${key}=${val}; ${expires}`
  }

  getAll () {
    // NOPE
  }

  remove (key) {
    document.cookie = `${key}=; expires=${COOKIES_PAST}`
  }

  clear () {
    // NOPE
  }

  checkSupport () {
    return navigator.cookieEnabled
  }
}

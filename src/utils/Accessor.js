import WebStorage from './WebStorage'
import CookieStorage from './CookieStorage'
import AppStorage from './AppStorage'

export default class Accessor {
  constructor () {
    this._setStorage()
  }

  // Toggles the storage type based on its support
  _setStorage () {
    const localStorage = new WebStorage('localStorage')
    if (localStorage.isSupported) {
      this.store = localStorage
      this.storageType = 'localStorage'
      return
    }

    const cookieStorage = new CookieStorage()
    if (cookieStorage.isSupported) {
      this.store = cookieStorage
      this.storageType = 'cookieStorage'
      return
    }

    this.store = new AppStorage()
    this.storageType = 'appStorage'
  }

  get (key) {
    return this.store.get(key)
  }

  set (key, val) {
    if (key) {
      this.store.set(key, val)
      return true
    }

    return false
  }

  remove (key) {
    if (key) {
      this.store.remove(key)
      return true
    }

    return false
  }
}

export default class AppStorage {
  constructor () {
    this.store = (window.appStore) ? window.appStore : {}
  }

  get (key) {
    return this.store[key]
  }

  set (key, val) {
    this.store[key] = val
  }

  getAll () {
    return this.store
  }

  remove (key) {
    delete this.store[key]
  }

  clear () {
    // NOPE
  }
}

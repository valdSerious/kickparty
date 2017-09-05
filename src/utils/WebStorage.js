/**
 * A generic web storage factory for session and local storage
 * @param {String} storageType   'localStorage' || 'sessionStorage'
 *     - derived from the window[property] for web storage
 */

export default class WebStorage {
  constructor (storageType) {
    this.isSupported = this.checkSupportFor(storageType)
  }

  /**
   * Retrieves a value from web storage given a key. If the value is an array or object in JSON
   * format, it is converted into an Object before being returned
   * @param  {String} key The key to look up
   * @return {String|Object|Array}     The item in web storage.
   */
  get (key) {
    if (this.isSupported) {
      let value = ''

      try {
        value = this.webStorage.getItem(key)
      } catch (error) {
        console.error('Error attempting to get key ' + key + ' from ' + this.type)
        throw new Error('Unable to get stored preference')
      }

      if (value) {
        value = this.decode(value)
        if ((value.charAt(0) === '{') || (value.charAt(0) === '[')) {
          value = this.deserialize(value)
        }
      }

      return value
    }

    return false
  }

  /**
   * Adds a key value pair to web storage. If the value given in an array or object, it is
   * stringified into JSON format and saved as a string.
   * @param {String} key   Key to store the data with
   * @param {String|Object|Array} value The value to store; may be a string, object or array
   */
  set (key, value) {
    if (this.isSupported && value && key) {
      try {
        if (value instanceof Object) {
          value = this.serialize(value)
        }

        if (value) {
          value = this.encode(value)
        }

        this.webStorage.setItem(key, value)

        return true
      } catch (error) {
        console.error('Unable to save key ' + key + ' to ' + this.type)
        return false
      }
    }

    return false
  }

  /**
   * Returns all keys in web storage that start with keyPrefix; if keyPrefix is not provided, all keys are returned.
   * @param  {String} keyPrefix If provided, returns keys that start with this value
   * @return {Array}           An array of matching keys
   */
  getAll (keyPrefix) {
    const returnKeys = []
    let key, keyPrefixLength

    if (keyPrefix && keyPrefix.length) {
      keyPrefixLength = keyPrefix.length
    } else {
      keyPrefixLength = 0
    }

    try {
      for (key in this.webStorage) {
        if ((keyPrefixLength === 0) || (key.substr(0, keyPrefixLength) === keyPrefix)) {
          returnKeys.push(key.substr(keyPrefixLength))
        }
      }
    } catch (error) {
      throw new Error('Unable to read stored preferences.')
    }

    return returnKeys
  }

  /**
   * Removes (deletes) a given key from the web storage database.
   * @param  {String} key Key to be deleted
   * @return {boolean}     True if delete succeeded, false otherwise.
   */
  remove (key) {
    if (this.isSupported && key) {
      try {
        this.webStorage.removeItem(key)
        return true
      } catch (error) {
        console.error('Error occurred while trying to remove key ' + key + ' from ' + this.type)
        return false
      }
    }

    return false
  }

  /**
   * Removes (deletes) a ALL keys from the web storage database.
   * @return {boolean} True if delete succeeded, false otherwise.
   */
  clear () {
    if (this.isSupported) {
      try {
        this.webStorage.clear()
        return true
      } catch (error) {
        console.error('Error occurred while trying to clear ALL data from ' + this.type)
        return false
      }
    }

    return false
  }

  serialize (value) {
    return JSON.stringify(value)
  }

  deserialize (value) {
    return JSON.parse(value)
  }

  encode (value) {
    return value
    // return Base64.encode(value)
  }

  decode (value) {
    return value
    // return Base64.decode(value)
  }

  /**
   * Determines if named web storage type is enabled in this browser
   * @return {Boolean} True if the browser supports named web storage
   */
  checkSupportFor (storageType) {
    let hasStorage = false

    if (storageType in window && window[storageType]) {
      this.webStorage = window[storageType]
      this.type = storageType

      try {
        window[storageType].setItem('test', 1)
        window[storageType].removeItem('test')
        hasStorage = true
      } catch (error) {
        hasStorage = false
      }
    }

    return hasStorage
  }
}

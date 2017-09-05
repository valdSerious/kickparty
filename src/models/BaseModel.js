/*
PROOF OF CONCEPT
Base data structure for all API information
@params props [object] kvp of data to be set on the model
@params keyList [array] optional string list of keys allowed to be set on the model

TODO
- Create a config object that gives a data type for each value
- push all data into a private _data object and have the getter/setter access it that
- create a function to return all data, basically the _data obj but with any sort of validations or whatevs
*/
export default class BaseModel {
  constructor (keyList) {
    this._validKeys = keyList || []
    this._attributes = {}
  }

  set keys (keys) {
    this._validKeys = keys
  }

  get props () {
    return this._attributes
  }

  get propsJSON () {
    return JSON.stringify(this._attributes)
  }

  setProp (key, val) {
    if (this._validateKey(key)) {
      this._attributes[key] = val

      // Object.defineProperty( this, 'prop', {options})
    }
  }

  setProps (props) {
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        this.setProp(key, props[key])
      }
    }
  }

  _validateKey (key) {
    // if there are no keys to validate we cant and must assume all keys are ok
    if (this._validKeys.length === 0) {
      return true
    }

    // or we just check for the presence of the key in the provided key list
    return (this._validKeys.indexOf(key) !== -1)
  }
}

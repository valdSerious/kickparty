require('whatwg-fetch')
import isArray from 'lodash/isArray.js'
import isObject from 'lodash/isObject.js'
import map from 'lodash/map.js'
import capitalize from 'lodash/capitalize.js'
import session from './session.js'

const rootUrl = process.env.API_URL
console.warn('API_URL: ' + rootUrl)

function errorMessage (json) {
  var msg = ''
  if (json.errors) {
    if (isArray(json.errors)) {
      msg += json.errors.join('\n')
    }

    if (isObject(json.errors)) {
      msg += map(json.errors, (v, k) => { return capitalize(`${k} ${v}`) })
        .join('\n')
    }
    // msg += json.errors
  }
  if (json.error) {
    // singular
    msg += json.error
  }

  if (msg === '') {
    msg = 'There was an error with this request.'
  }
  return msg
}

module.exports = {
  _headers () {
    return {
      'Authorization': session.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  _request (url, options) {
    return new Promise((resolve, reject) => {
      return window.fetch(url, options).then((response) => {
        if (response.ok) {
          return response.json().then((json) => resolve(json))
        }

        return response.text().then((text) => {
          reject({
            status: response.status,
            message: (text.length > 0) ? errorMessage(JSON.parse(text)) : 'There was an error with this request.'
          })
        })
      })
    })
  },
  get (url) {
    const options = {
      headers: this._headers(),
      method: 'GET',
      mode: 'cors'
    }

    return this._request(rootUrl + url, options)
  },
  patch (url, data) {
    const options = {
      headers: this._headers(),
      method: 'PATCH',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return this._request(rootUrl + url, options)
  },
  post (url, data) {
    const options = {
      headers: this._headers(),
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return this._request(rootUrl + url, options)
  },
  postForm (url, data) {
    const formData = new window.FormData()

    for (const name in data) {
      formData.append(name, data[name])
    }

    const headers = {
      'Authorization': session.token,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }

    const options = {
      headers,
      method: 'POST',
      body: formData,
      mode: 'cors'
    }

    // console.warn(options.body)

    return this._request(rootUrl + url, options)
  },
  delete (url, data) {
    const options = {
      headers: this._headers(),
      method: 'DELETE',
      mode: 'cors'
    }
    if (data) {
      options.body = JSON.stringify(data)
    }

    return this._request(rootUrl + url, options)
  },
  getExactUrl (url) {
    const options = {
      method: 'GET'
    }

    return this._request(url, options)
  }
}

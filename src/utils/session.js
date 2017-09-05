import Accessor from './Accessor'

const session = {
  _store: new Accessor(),
  set token (token) {
    if (token) {
      session._store.set('JWT', token)
    }
  },
  get token () {
    return session._store.get('JWT')
  },
  deleteToken () {
    session._store.remove('JWT')
    return true
  }
}

export default session

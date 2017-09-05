import objectAssign from 'object-assign'
const RAYGUN_KEY = process.env.RAYGUN_KEY
const DEFAULT_USER = {
  identifier: 'Not logged in',
  isAnonymous: false,
  email: 'Not logged in',
  firstName: 'Not logged in',
  fullName: 'Not logged in'
}

// ErrorReporter
export default {
  init (store) {
    // KEY present only in staging and production builds
    if (window && window.rg4js && RAYGUN_KEY) {
      const { rg4js } = window
      let reportingUser = objectAssign({}, DEFAULT_USER)

      rg4js('apiKey', RAYGUN_KEY)
      rg4js('enableCrashReporting', true)
      rg4js('enablePulse', false)
      // rg4js('setUser', reportingUser)

      if (store) {
        let currentState
        store.subscribe(() => {
          let previousState = currentState
          currentState = store.getState()

          if (previousState !== currentState) {
            const { authStore } = currentState

            if (authStore && authStore.user && authStore.user.slug !== DEFAULT_USER.identifier) {
              reportingUser = objectAssign({}, DEFAULT_USER, {
                identifier: authStore.user.slug,
                email: authStore.user.email,
                firstName: authStore.user.firstName,
                fullName: `${authStore.user.firstName} ${authStore.user.lastName}`
              })

              rg4js('setUser', reportingUser)
            } /*else {
              reportingUser = objectAssign({}, DEFAULT_USER)
              rg4js('setUser', reportingUser)
            }*/
          }
        })
      }
    }
  },
  test () {
    const { Raygun } = window
    if (Raygun) {
      Raygun.init(RAYGUN_KEY)
      try {
        throw new Error('Test error')
      } catch (e) {
        Raygun.send(e)
      }
    }
  },
  submit (error) {
    const { Raygun } = window
    if (Raygun) {
      Raygun.init(RAYGUN_KEY)
      Raygun.send(error)
    }
  }
}

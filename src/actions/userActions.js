export const CURRENT_USER = 'CURRENT_USER'

export function getCurrentUser () {
  return {
    type: CURRENT_USER,
    payload: null
  }
}

import ResourceTypeModel from '../models/ResourceTypeModel'
import RESOURCE_TYPES from '../constants/RESOURCE_TYPES.json'

export const GET_RESOURCE_TYPES = 'GET_RESOURCE_TYPES'

/*
Get all resources types
*/
export function getResourceTypes () {
  const types = []
  RESOURCE_TYPES.forEach((type) => {
    types.push(new ResourceTypeModel(type))
  })

  return {
    type: GET_RESOURCE_TYPES,
    payload: types
  }
}

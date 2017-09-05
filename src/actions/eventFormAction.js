export const SAVE_IMAGE = 'SAVE_IMAGE'
export const SAVE_START_DATE = 'SAVE_START_DATE'
export const SAVE_END_DATE = 'SAVE_END_DATE'
export const SAVE_FUND_DEADLINE = 'SAVE_FUND_DEADLINE'
export const SAVE_LOCATION = 'SAVE_LOCATION'
export const SAVE_LOCATION_TIMEZONE = 'SAVE_LOCATION_TIMEZONE'
export const CHANGE_ATTENDEE = 'CHANGE_ATTENDEE'
export const CHANGE_MAX_ATTENDEE = 'CHANGE_MAX_ATTENDEE'
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE'
export const SAVE_START_TIME = 'SAVE_START_TIME'
export const SAVE_END_TIME = 'SAVE_END_TIME'
export const CLEAR_FORM = 'CLEAR_FORM'
export const SAVE_DESCRIPTION = 'SAVE_DESCRIPTION'
export const ATTENDEE_COST = 'ATTENDEE_COST'
export const BASE_COST = 'BASE_COST'
export const TOTAL_COST = 'TOTAL_COST'
export const RESOURCE_COST = 'RESOURCE_COST'
export const CALC_METHOD = 'CALC_METHOD'
export const SAVE_BROWSER_AND_IP = 'SAVE_BROWSER_AND_IP'

export function clearForm () {
  return {
    type: CLEAR_FORM
  }
}

export function saveDate (dateProps) {
  const date = {
    payload: {
      value: new Date(dateProps[1]),
      touched: true,
      visited: true
    }
  }
/*
  return {
    type: (dateProps[0] === 'startDate') ? SAVE_DATE : SAVE_FUND_DEADLINE,
    payload: {
      value: new Date(dateProps[1]),
      touched: true,
      visited: true
    }
  }
*/

  if (dateProps[0] === 'startDate') {
    date.type = 'SAVE_START_DATE'
  } else if (dateProps[0] === 'endDate') {
    date.type = 'SAVE_END_DATE'
  } else {
    date.type = 'SAVE_FUND_DEADLINE'
  }

  return date
}

export function saveTime (name, value) {
  const time = {
    payload: {
      value,
      touched: true,
      visited: true
    }
  }

  if (name === 'startTime') {
    time.type = SAVE_START_TIME
  } else if (name === 'endTime') {
    time.type = SAVE_END_TIME
  }

  return time
}

export function saveLocation (value) {
  return {
    type: SAVE_LOCATION,
    payload: {
      locationName: {
        value: value.locationName,
        touched: true,
        visited: true
      },
      locationAddress: {
        value: value.locationAddress,
        touched: true,
        visited: true
      },
      locationLat: {
        value: value.locationLat,
        touched: true,
        visited: true
      },
      locationLng: {
        value: value.locationLng,
        touched: true,
        visited: true
      },
      locationCity: {
        value: value.locationCity,
        touched: true,
        visited: true
      },
      locationState: {
        value: value.locationState,
        touched: true,
        visited: true
      },
      locationCountry: {
        value: value.locationCountry,
        touched: true,
        visited: true
      }
    }
  }
}

export function saveLocationTimezone (locationTimezone) {
  return {
    type: SAVE_LOCATION_TIMEZONE,
    payload: {
      timezoneOffset: {
        value: locationTimezone.rawOffset,
        touched: true,
        visited: true
      },
      timezoneName: {
        value: locationTimezone.timeZoneName,
        touched: true,
        visited: true
      }
    }
  }
}

export function saveImage (image) {
  return {
    type: SAVE_IMAGE,
    payload: {
      value: image,
      touched: true,
      visited: true
    }
  }
}

export function changeAttendeeCount (value) {
  return {
    type: CHANGE_ATTENDEE,
    payload: {
      value,
      touched: true,
      visited: true
    }
  }
}

export function changeMaxAttendeeCount (value) {
  return {
    type: CHANGE_MAX_ATTENDEE,
    payload: {
      value,
      touched: true,
      visited: true
    }
  }
}

export function setCalculationMethod (calcMethod) {
  return {
    type: CALC_METHOD,
    payload: {
      value: calcMethod,
      touched: true,
      visited: true
    }
  }
}

export function updateResources (resources) {
  return [
    {
      type: UPDATE_RESOURCE,
      payload: {
        value: resources,
        touched: true,
        visited: true
      }
    }
  ]
}

export function setAttendeeCost (cost) {
  return {
    type: ATTENDEE_COST,
    payload: {
      value: cost,
      touched: true,
      visited: true
    }
  }
}

export function saveDescription (description) {
  return {
    type: SAVE_DESCRIPTION,
    payload: {
      value: description,
      touched: true,
      visited: true
    }
  }
}

export function saveBrowserAndIP (data) {
  return {
    type: SAVE_BROWSER_AND_IP,
    payload: {
      userData: {
        value: data.userData,
        touched: true,
        visited: true
      },
      browserData: {
        value: data.browserData,
        touched: true,
        visited: true
      }
    }
  }
}

export function updatePricing (costParams) {
  if (costParams.baseCost !== undefined && isNaN(costParams.baseCost)) {
    costParams.baseCost = 0
  }

  const actions = []
  const { baseCost, resourceCost, attendeeCount } = costParams

  let calculatedTotal = 0

  if (baseCost >= 0) {
    calculatedTotal += baseCost
    actions.push(
      {
        type: BASE_COST,
        payload: {
          value: baseCost,
          touched: true,
          visited: true
        }
      }
    )
  }

  if (resourceCost) {
    calculatedTotal += resourceCost
    actions.push(
      {
        type: RESOURCE_COST,
        payload: {
          value: resourceCost,
          touched: true,
          visited: true
        }
      }
    )
  }

  if (attendeeCount) {
    actions.push(
      {
        type: ATTENDEE_COST,
        payload: {
          value: calculatedTotal / attendeeCount,
          touched: true,
          visited: true
        }
      }
    )
  }

  actions.push(
    {
      type: TOTAL_COST,
      payload: {
        value: calculatedTotal,
        touched: true,
        visited: true
      }
    }
  )

  return actions
}

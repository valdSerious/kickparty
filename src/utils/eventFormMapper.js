import objectAssign from 'object-assign'
import load from 'load-script'
import UAParser from 'ua-parser-js'
import helpers from './helpers'

export default {
  // prep data before it goes to the api
  toApi (formData) {
    // console.info(formData)

    var uaParser = new UAParser()
    load('https://api.userinfo.io/userinfos?jsonp_variable=data', (err, script) => {
      if (err) {
        console.log('Script failed to load.')
      } else {
        // define the variable 'data' that comes from the script above
        /*global data*/
      }
    })

    const event = {
      event: {
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        deadline: helpers.mergeDateTime(formData.deadline, '23:59'),
        description: formData.description,
        eventTypeId: formData.eventTypeId,
        headerImg: formData.headerImg,
        locationAddress: formData.locationAddress,
        locationName: formData.locationName,
        locationLat: formData.locationLat,
        locationLng: formData.locationLng,
        locationCity: formData.locationCity,
        locationState: formData.locationState,
        locationCountry: formData.locationCountry,
        timezoneOffset: formData.timezoneOffset,
        timezoneName: formData.timezoneName,
        name: formData.name,
        status: ~~formData.status,
        start: helpers.mergeDateTime(formData.startDate, formData.startTime),
        end: helpers.mergeDateTime(formData.endDate, formData.endTime),
        browserData: uaParser.getResult(),
        userData: data
      },
      tiers: [
        {
          minAttendeeCount: ~~formData.attendeeCount,
          contribution: ~~formData.contribution,
          contributionNote: formData.contributionNote,
          maxAttendeeCount: ~~formData.maxAttendeeCount
        }
      ]
    }

    console.info('MAPPED EVENT', JSON.stringify(event, null, 2))

    return event
  },

  // param [formData] comes our of redux-form
  // param [form] comes out of the app redux store
  resourcesToApi (formData, form, eventId) {
    const mappedData = {
      id: eventId,
      tiers: [
        {
          baseCost: ~~formData.baseCost,
          calculationMethod: ~~formData.calculationMethod,
          costPerAttendee: parseFloat(formData.attendeeCost)
        }
      ],
      resources: []
    }

    let resources = []

    for (let resourceTypeId in form.resources) {
      if (form.resources[resourceTypeId] instanceof Array) {
        resources = resources.concat(form.resources[resourceTypeId])
      }
    }

    mappedData.resources = resources

    console.info('MAPPED RESOURCES', JSON.stringify(mappedData, null, 2))

    return objectAssign({}, mappedData)
  }
}

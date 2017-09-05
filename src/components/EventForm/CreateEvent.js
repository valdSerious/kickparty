import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import load from 'load-script'
import UAParser from 'ua-parser-js'

import { Calendar } from '../UIComponents'
import Increment from '../Increment'
import RichTextEditor from '../RichTextEditor'
import MapSearch from '../MapSearch'
import FileUpload from '../FileUpload'
import ImageEditor from '../EventForm/ImageEditor'
import ValidationMessage from '../UIComponents/ValidationMessage'
import { saveDate, changeAttendeeCount, changeMaxAttendeeCount, saveLocation, saveLocationTimezone, saveImage, saveDescription, saveTime, saveBrowserAndIP } from '../../actions/eventFormAction'
import { PUBLIC, PRIVATE } from '../../constants/AppConstants'
import isValid from '../../utils/isValid'

export const fields = [
  'name', 'status', 'eventTypeId', 'description', 'contactPhone', 'contactEmail',
  'startDate', 'endDate', 'headerImg', 'attendeeCount', 'maxAttendeeCount', 'startTime',
  'endTime', 'locationAddress', 'locationName', 'locationLat', 'locationLng',
  'locationCity', 'locationState', 'locationCountry', 'timezoneOffset', 'timezoneName',
  'deadline', 'contribution', 'contributionNote'
]

export default class CreateEvent extends Component {
  static get displayName () {
    return 'EventForm/CreateEvent'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func.isRequired,
      eventTypes: PropTypes.array,
      fields: PropTypes.object.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      resetForm: PropTypes.func.isRequired,
      submitting: PropTypes.bool.isRequired,
      initializeForm: PropTypes.func.isRequired,
      initFields: PropTypes.object,
      onCancel: PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    this.state = {}

    this.addHeaderImage = this.addHeaderImage.bind(this)
    this.onChangeAttendeeCount = this.onChangeAttendeeCount.bind(this)
    this.onChangeMaxAttendeeCount = this.onChangeMaxAttendeeCount.bind(this)
    this.removeHeaderImage = this.removeHeaderImage.bind(this)
    this.renderUploadPreview = this.renderUploadPreview.bind(this)
    this.saveDate = this.saveDate.bind(this)
    this.saveLocation = this.saveLocation.bind(this)
    this.saveLocationTimezone = this.saveLocationTimezone.bind(this)
    this.onChangeEventDescription = this.onChangeEventDescription.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.renderEditRichTextEditor = this.renderEditRichTextEditor.bind(this)
    this.renderNewRichTextEditor = this.renderNewRichTextEditor.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.saveBrowserAndIP = this.saveBrowserAndIP.bind(this)
  }

  componentDidMount () {
    const { initFields } = this.props

    if (initFields) {
      // flatten the tier data so it can be initialized
      initFields.contribution = initFields.tiers[0].contribution
      initFields.contributionNote = initFields.tiers[0].contributionNote
      this.props.initializeForm(initFields)
      this.onChangeAttendeeCount(initFields.attendeeCount)
      this.onChangeEventDescription(initFields.description)
      // this.onChangeMaxAttendeeCount(initFields.maxAttendeeCount) // This comes from tier data
      this.onChangeAttendeeCount(initFields.helpers.minAttendeeCount)
      this.onChangeMaxAttendeeCount(initFields.helpers.maxAttendeeCount)
      this.saveDate(['startDate', initFields.startDate])
      this.saveDate(['endDate', initFields.endDate])
      this.saveDate(['deadline', initFields.deadline])
      this.props.dispatch(saveLocation({
        locationName: initFields.locationName,
        locationAddress: initFields.locationAddress,
        locationLat: initFields.locationLat,
        locationLng: initFields.locationLng,
        locationCity: initFields.locationCity,
        locationState: initFields.locationState,
        locationCountry: initFields.locationCountry
      }))
    }
    this.saveBrowserAndIP()
  }

  addHeaderImage (files) {
    if (files.length > 0) {
      const reader = new window.FileReader()
      const file = files[0]

      reader.onload = (readerEvt) => {
        const binaryString = readerEvt.target.result
        const image = window.btoa(binaryString)
        this.props.dispatch(saveImage({ data: image, type: file.type, name: file.name }))
      }

      reader.readAsBinaryString(file)
    }
  }

  removeHeaderImage () {
    this.props.dispatch(saveImage(null))
  }

  saveLocation (marker) {
    this.props.dispatch(saveLocation({
      locationName: marker.title,
      locationAddress: marker.address,
      locationLat: marker.position.lat,
      locationLng: marker.position.lng,
      locationCity: marker.city,
      locationState: marker.state,
      locationCountry: marker.country
    }))
  }

  saveBrowserAndIP () {
    let browserAndIP = {
      userData: null,
      browserData: null
    }

    var uaParser = new UAParser()
    browserAndIP.browserData = uaParser.getResult()

    load('https://api.userinfo.io/userinfos?jsonp_variable=data', (err, script) => {
      if (err) {
        console.log('Script failed to load.')
      } else {
        // define the variable 'data' that comes from the script above
        /*global data*/
        browserAndIP.userData = data
      }
    })

    this.props.dispatch(saveBrowserAndIP(browserAndIP))
  }

  saveLocationTimezone (timezone) {
    this.props.dispatch(saveLocationTimezone(timezone))
  }

  saveDate (date = []) {
    this.props.dispatch(saveDate(date))
  }

  onChangeAttendeeCount (attendeeCount) {
    this.props.dispatch(changeAttendeeCount(attendeeCount))
  }

  onChangeMaxAttendeeCount (maxAttendeeCount) {
    this.props.dispatch(changeMaxAttendeeCount(maxAttendeeCount))
  }

  onChangeEventDescription (description) {
    this.props.dispatch(saveDescription(description))
  }

  onCancel () {
    const { onCancel, resetForm } = this.props

    if (onCancel && onCancel instanceof Function) {
      onCancel()
    }

    resetForm()
  }

  onTimeChange (se) {
    this.props.dispatch(saveTime(se.target.name, se.target.value))
  }

  render () {
    const { handleSubmit, fields, submitting } = this.props

    const { name, eventTypeId, description, contactPhone, contactEmail,
      headerImg, attendeeCount, maxAttendeeCount, startTime, endTime,
      startDate, endDate, locationAddress, locationName, locationLng, locationLat,
      locationCity, locationState, locationCountry, deadline, contribution,
      contributionNote, status
    } = fields

    let eventTypes = []
    if (this.props.eventTypes) {
      eventTypes = this.props.eventTypes.map((type, i) => {
        return (<option key={ `eventTypeId-${i}` } value={ type.id }>{ type.name }</option>)
      })
    }

    return (
      <form onSubmit={ handleSubmit } className='form-newEvent'>
        <section className='form-section'>
          <div className='form-component'>
            <h2>Event Name</h2>
            <input type='text' name='name' placeholder='Event name' { ...name } active={false} />
            <ValidationMessage validate={ name } />
          </div>

          <div className='form-component'>
            <h2>Which type of event?</h2>
            <select { ...eventTypeId }>
              <option>Please select an event type</option>
              { eventTypes }
            </select>
            <ValidationMessage validate={ eventTypeId } />
          </div>

          <div className='form-component'>
            <h2>Description</h2>
            {(this.props.initFields) ? this.renderEditRichTextEditor(description) : this.renderNewRichTextEditor(description) }
            <ValidationMessage validate={ description } />
          </div>

          <div className='form-component'>
            <h2>What kind of event is this</h2>
            <div className='input-eventStatus'>
              <label>
                <input type='radio' {...status} value={PRIVATE + ''} checked={status.value === PRIVATE + ''} /> Private
              </label>
              <label>
                <input type='radio' {...status} value={PUBLIC + ''} checked={status.value === PUBLIC + ''} /> Public
              </label>
            </div>
            <ValidationMessage validate={ status } />
          </div>

          <div className='form-component'>
            <h2>Add a banner image *</h2>
            { !headerImg.value ? <FileUpload cb={ this.addHeaderImage } /> : this.renderUploadPreview(headerImg) }
          </div>

          <div className='form-component'>
            <h2>Where will it happen?</h2>
            { (locationLat.value && locationLng.value && locationName.value && locationAddress.value)
              ? <MapSearch className='map-control'
                  handleChange={ this.saveLocation }
                  handleTimezoneChange={ this.saveLocationTimezone }
                  defaultPosition={[locationLat.value, locationLng.value]}
                  defaultName={locationName.value}
                  defaultAddress={locationAddress.value}
                  defaultCity={locationCity.value}
                  defaultState={locationState.value}
                  defaultCountry={locationCountry.value} />
              : <MapSearch className='map-control'
                  handleChange={ this.saveLocation }
                  handleTimezoneChange={ this.saveLocationTimezone } />
              }
              <ValidationMessage validate={ locationAddress } />
          </div>

          <div className='form-component'>
            <h2>When is it happening?</h2>
            <div>
              <label>Start Date</label><br />
              <Calendar name='startDate' onChange={ this.saveDate } defaultValue={ startDate.value } className='start-date' />
              <ValidationMessage validate={ startDate } />
            </div>

            <div>
              <label htmlFor='start-time'>Start Time</label><br />
              <input id='start-time' name='startTime' type='time' value={ startTime.value } onChange={this.onTimeChange} placeholder='--:-- --' />
              <ValidationMessage validate={ startTime } />
              {/* <input id='start-date-time' name='startDateTime' type='datetime' placeholder='--:-- --' onChange={this.validateTime} value={this.state.startDateTime} />*/}
            </div>

            <div>
              <label>End Date</label><br />
              <Calendar name='endDate' onChange={ this.saveDate } defaultValue={ endDate.value } className='end-date' minDate={ startDate.value } />
            </div>

            <div>
              <label htmlFor='end-time'>End Time</label><br />
              <input id='end-time' name='endTime' type='time' value={ endTime.value } onChange={this.onTimeChange} placeholder='--:-- --' />
              <ValidationMessage validate={ endTime } />
            </div>

            <div>
              <label>Funding Deadline</label><br />
              <Calendar name='deadline' onChange={ this.saveDate } defaultValue={ deadline.value } maxDate={ startDate.value } />
              <ValidationMessage validate={ deadline } />
            </div>
          </div>

          <div className='form-component'>
            <h2>Your Contact Info</h2>
            <input type='tel' name='contactPhone' placeholder='PHONE' { ...contactPhone } />
            <ValidationMessage validate={ contactPhone } />

            <input type='email' name='contactEmail' placeholder='EMAIL' { ...contactEmail } />
            <ValidationMessage validate={ contactEmail } />
          </div>

          <div className='form-component'>
            <h2>How many people do you want to attend the event?</h2>
            <h3><em>Estimate how many are needed to make it happen.</em></h3>
            <Increment name='attendeeCount' onChange={ this.onChangeAttendeeCount } val={ attendeeCount.value }/>
            <ValidationMessage validate={ attendeeCount } />

            <h3><em>What is the maximum number of people you want to attend the event?</em></h3>
            <Increment name='maxAttendeeCount' onChange={ this.onChangeMaxAttendeeCount } val={ maxAttendeeCount.value } />
            <ValidationMessage validate={ maxAttendeeCount } />
          </div>

          <div className='form-component'>
            <h2>How much would you like to contribute? * </h2>
            <input name='contribution' type='number' { ...contribution } placeholder='Contribution amount ($)' />
            <ValidationMessage validate={ contribution } />

            <textarea name='contributionNote' placeholder='Explain your contribution' { ...contributionNote } />
            <ValidationMessage validate={ contributionNote } />
            <label>* Indicates optional</label>
          </div>

          <footer className='event-form__footer'>
            <button type='button' className='btn-prev' onClick={ this.onCancel } disabled={ submitting }>Cancel</button>
            <button type='submit' className='btn-next' disabled={ submitting }>Save</button>
          </footer>
        </section>
      </form>
    )
  }

  // HACK! for some resaseon quill has issues with setting a default value
  renderEditRichTextEditor (description) {
    if (!description.value) {
      return null
    }

    return <RichTextEditor key='quill_edit' name='description' onChange={ this.onChangeEventDescription } val={ description.value } />
  }

  renderNewRichTextEditor (description) {
    return <RichTextEditor key='quill_new' name='description' onChange={ this.onChangeEventDescription } val={ description.value } />
  }

  renderUploadPreview (headerImage) {
    return (
      <ImageEditor
        onRemoveClick={this.removeHeaderImage}
        image={headerImage}
        onImageChange={(image) => { this.props.dispatch(saveImage(image)) }} />
    )
  }
}

const validate = (values) => {
  const errors = {}

  const attendeeCap = 500
  const today = new Date()

  // Event name
  if (!values.name) {
    errors.name = 'Event name required'
  } else if (values.name.length === 1) {
    errors.name = 'A little longer!'
  } else if (values.name.length > 50) {
    errors.name = 'Must be less than 50 characters'
  }

  // Event type
  if (!values.eventTypeId || values.eventTypeId === 'Please select an event type') {
    errors.eventTypeId = 'Event type required'
  }

  // Description
  if (!values.description) {
    errors.description = 'Description required'
  } else if (values.description && values.description.length < 17) {
    // using 17 because content is wrapped in <div></div> to begin with
    errors.description = 'Description needs to be at least 6 characters long'
  }

  // Status
  if (!values.status) {
    errors.status = 'Event status required'
  }

  // TODO: Validate header image
  /*
  if (!values.headerImg) {
    errors.headerImg = 'Event image required'
  }
  */

  // Location
  if (!values.locationAddress) {
    errors.locationAddress = 'Event location required'
  } // TODO: Validate addresses/locations beyond just checking if it exists

  if (!values.timezoneOffset) {
    errors.locationAddress = 'Getting location timezone ...'
  }

  // Start date
  if (!values.startDate) {
    errors.startDate = 'A valid start date required'
  } else if (values.startDate < today) {
    errors.startDate = 'Your event must not have already started'
  }

  // End date
  if (!values.endDate) {
    errors.endDate = 'A valid end date required'
  } else if (values.startDate > values.endDate) {
    errors.endDate = 'Your end date must be after your start date'
  } else if (values.endDate < today) {
    errors.endDate = 'Your event must not have already ended'
  }

  // Start time
  // console.info('val', values.startTime)
  if (!values.startTime || isValid.time(values.startTime)) {
    errors.startTime = 'A valid start time required ex: 12:00 pm'
  }

  // End time
  if (!values.endTime || isValid.time(values.endTime)) {
    errors.endTime = 'A valid end time required. ex: 12:00 pm'
  } else if (values.endTime <= values.startTime) {
    // errors.endTime = 'Your event should end after it starts'
  }

  // Phone number
  /*
  regex matches:
  (123) 456-7890
  123-456-7890
  123.456.7890
  12345678904
  */
  // if (!values.contactPhone) {
  //   errors.contactPhone = 'Phone required'
  // } else if (!/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(values.contactPhone)) {
  //    errors.contactPhone = 'Invalid phone number'
  // }

  // Email
  // if (!values.contactEmail) {
  //   errors.contactEmail = 'Email required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)) {
  //   errors.contactEmail = 'Invalid email address'
  // }

  // Attendance count validation
  if (!values.attendeeCount) {
    errors.attendeeCount = 'Please specify an estimated attendee count'
  }

  // Max attendance count validation
  if (!values.maxAttendeeCount) {
    errors.maxAttendeeCount = 'Please specify an estimated max attendee count'
  }

  // Max attendee count validation for initial state
  if (values.maxAttendeeCount &&
      values.attendeeCount &&
      values.maxAttendeeCount < values.attendeeCount) {
    // Max attendee count validation for all other cases
    errors.maxAttendeeCount = 'The maximum attendee count must be higher than your estimate'
  }

  // Attendee count capped value
  if (values.attendeeCount > attendeeCap) {
    errors.attendeeCount = 'This event cannot support this many people'
  }

  // Max attendee count capped value
  if (values.maxAttendeeCount > attendeeCap) {
    errors.maxAttendeeCount = 'This event cannot support this many people'
  }

  // Deadline to fund
  if (!values.deadline) {
    errors.deadline = 'Deadline to fund required'
  } else if (values.startDate < values.deadline) {
    errors.deadline = 'Deadline to fund must be before the event date'
  } else if (values.deadline < today) {
    errors.deadline = 'Deadline must not have already passed'
  }

  // Contribution
  if (values.contribution < 0) {
    errors.contribution = 'Contributiion must be a positive amount'
  }

  return errors
}

export default reduxForm({
  form: 'eventForm',
  fields,
  destroyOnUnmount: true,
  validate
})(CreateEvent)

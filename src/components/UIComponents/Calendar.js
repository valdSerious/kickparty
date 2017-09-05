import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

export default class Calendar extends Component {
  static get displayName () {
    return 'UIComponents/Calendar'
  }

  static propTypes () {
    return {
      onChange: PropTypes.func,
      defaultValue: PropTypes.instanceOf(Date),
      maxDate: PropTypes.instanceOf(Date),
      minDate: PropTypes.instanceOf(Date),
      name: PropTypes.string.isRequired,
      className: PropTypes.string,
      type: PropTypes.string
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      value: moment().format('L'), // The value of the input field
      month: new Date() // The month to display in the calendar
    }

    if (props.defaultValue) {
      const timeStamp = Date.parse(props.defaultValue)

      if (isNaN(timeStamp) === false) {
        /*eslint react/no-direct-mutation-state: 0*/
        // this happens in a prerender state so we are not mutating state in a non react way
        this.state.value = moment(props.defaultValue).format('L')
        this.state.month = props.defaultValue
      }
    }

    this.isRestricted = this.isRestricted.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.showCurrentDate = this.showCurrentDate.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.defaultValue) {
      const timeStamp = Date.parse(props.defaultValue)

      if (isNaN(timeStamp) === false) {
        this.setState({
          value: moment(props.defaultValue).format('L'),
          month: props.defaultValue
        })
      }
    }
    return props
  }

  handleDayClick (e, day, modifiers) {
    if (modifiers.indexOf('disabled') > -1) {
      return
    }

    this.setState({
      value: moment(day).format('L'),
      month: day
    }, () => {
      if (this.props.onChange) {
        this.props.onChange([this.props.name, this.state.month])
      }
    })
  }

  showCurrentDate () {
    this.refs.daypicker.showMonth(this.state.month)
  }

  isRestricted (d) {
    const today = new Date()

    d.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    return (d < today || (this.props.maxDate && d > this.props.maxDate) || (this.props.minDate && d < this.props.minDate))
  }

  render () {
    const selectedDay = moment(this.state.value, 'L', true).toDate()
    const modifiers = {
      selected: (day) => DateUtils.isSameDay(selectedDay, day),
      disabled: this.isRestricted
    }

    return (
      <div className={this.props.className} style={{ maxWidth: '400px', margin: 'auto' }}>
        <DayPicker
          ref='daypicker'
          initialMonth={ this.state.month }
          modifiers={ modifiers }
          onDayClick={ this.handleDayClick.bind(this) }
        />
      </div>
    )
  }
}

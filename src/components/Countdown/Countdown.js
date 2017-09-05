import moment from 'moment'
import React, { Component, PropTypes } from 'react'

export default class Countdown extends Component {
  static get displayName () {
    return 'Countdown'
  }

  static propTypes () {
    return {
      date: PropTypes.instanceOf(Date)
    }
  }

  constructor (props) {
    super(props)
    this.state = {}
    this.endDate = (this.props.date) ? moment(this.props.date).utc() : null

    this.tick = this.tick.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  componentDidMount () {
    this.start()
  }

  componentWillReceiveProps (props) {
    this.stop()
    this.endDate = (props.date) ? moment(props.date).utc() : null
    this.start()
  }

  componentWillUnmount () {
    this.stop()
  }

  start () {
    if (this.endDate) {
      this.tick()
      this.interval = setInterval(this.tick, 1000)
    }
  }

  stop () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  tick () {
    const now = moment().utc()
    let daysLeft = this.endDate.diff(now, 'days')
    let hoursLeft = this.endDate.diff(moment(now).add(daysLeft, 'days'), 'hours')
    let minutesLeft = this.endDate.diff(moment(now).add(daysLeft, 'days').add(hoursLeft, 'hours'), 'minutes')
    let secondsLeft = this.endDate.diff(moment(now).add(daysLeft, 'days').add(hoursLeft, 'hours').add(minutesLeft, 'minutes'), 'seconds')

    if (daysLeft <= 0 && hoursLeft <= 0 && minutesLeft <= 0 && secondsLeft <= 0) {
      daysLeft = 0
      hoursLeft = 0
      minutesLeft = 0
      secondsLeft = 0
      this.stop()
    }

    this.setState({ daysLeft, hoursLeft, minutesLeft, secondsLeft })
  }

  render () {
    const { daysLeft, hoursLeft, minutesLeft, secondsLeft } = this.state

    return (
      <div className='flex counter'>
        <div className='card-box split'>
          <span className='countdown number'>{ daysLeft }</span>
          <span className='countdown text'>Days</span>
        </div>
        <div className='card-box split'>
          <span className='countdown number'>{ hoursLeft }</span>
          <span className='countdown text'>Hours</span>
        </div>
        <div className='card-box split'>
          <span className='countdown number'>{ minutesLeft }</span>
          <span className='countdown text'>Minutes</span>
        </div>
        <div className='card-box split'>
          <span className='countdown number'>{ secondsLeft }</span>
          <span className='countdown text'>Seconds</span>
        </div>
      </div>
    )
  }
}

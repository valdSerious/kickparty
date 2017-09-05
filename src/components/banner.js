import React, { Component, PropTypes } from 'react'
import { push } from 'react-router-redux'
import MediaQuery from 'react-responsive'

import { clearForm } from '../actions/eventFormAction'
import AppConstants from '../constants/AppConstants'

export default class Banner extends Component {
  static get displayName () {
    return 'Banner'
  }

  static propTypes () {
    return {
      dispatch: PropTypes.func.isRequired
    }
  }

  constructor (props) {
    super(props)
    this.createNewEvent = this.createNewEvent.bind(this)
  }

  createNewEvent () {
    this.props.dispatch(clearForm())
    this.props.dispatch(push('/events/new'))
  }

  render () {
    const max = `(max-width: ${AppConstants.DEVICE_MAXWIDTH}px)`
    const min = `(min-width: ${AppConstants.DEVICE_MAXWIDTH + 1}px)`

    return (
      <div>
        <MediaQuery query={ min }>{ this.renderWeb() }</MediaQuery>
        <MediaQuery query={ max }>{ this.renderMobile() }</MediaQuery>
      </div>
    )
  }

  renderMobile () {
    const style1 = {
      fontSize: '.8em'
    }

    const style2 = {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: '1.2em',
      color: '#50E3C2',
      backgroundColor: 'rgba(0,0,0,.4)'
    }

    return (
      <div className='banner' style={{ marginTop: 0, height: '400px' }}>
        <div className='wrapper' style={{ zIndex: 0 }}></div>
        <div className='selector' style={{ flexDirection: 'column', flexWrap: 'wrap', zIndex: 1 }}>
          <div style={ style1 }>Get Your Next</div>
          <a style={ style2 } onClick={ this.createNewEvent }>Great Party</a>
          <div style={ style1 }>Started</div>
          <a style={ style2 } onClick={ this.createNewEvent }>Right Now</a>
        </div>

        <div className='build-bar' style={{ zIndex: 1 }}>
          <a className='build-button pink mobile' onClick={ this.createNewEvent }>Build Your Event - It's Free!</a>
        </div>
      </div>
    )
  }

  renderWeb () {
    return (
      <div className='banner'>
        <div className='wrapper'>
          <div className='flag'>
            <div className='triangle'></div>
          </div>
          <div className='flag-text'>
            <p><a style={{color: 'white'}} href='/events/new'>Plan Something Awesome.</a></p>
          </div>
        </div>

        <div className='selector' style={{ flexDirection: 'column' }}>
          <div>
            <div>
              Get Your <a className='dropdown what' onClick={ this.createNewEvent }>Next Great Party</a> Started <a className='dropdown what' onClick={ this.createNewEvent }>Right Now</a>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <a className='button' style={{ paddingLeft: 12, paddingRight: 12, width: 110 }} onClick={ this.createNewEvent }>GO<span> &raquo;</span></a>
          </div>
        </div>

        <div className='build-bar'>
          <div className='build-angle-left'></div>
          <a className='build-button pink' onClick={ this.createNewEvent }>Build Your Event - It's Free!</a>
          <div className='build-angle-right'></div>
        </div>
      </div>
    )
  }
}

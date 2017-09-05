import './spinnerB.scss'
import React, { Component } from 'react'

export default class SpinnerB extends Component {
  static get displayName () {
    return 'SpinnerB'
  }

  render () {
    return (
      <div className='spinner-container'>
        <i className='preloader'></i>
      </div>
    )
  }
}

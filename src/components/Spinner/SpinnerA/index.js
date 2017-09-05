import './spinnerA.scss'
import React, { Component } from 'react'

export default class SpinnerA extends Component {
  static get displayName () {
    return 'SpinnerA'
  }

  render () {
    return (
      <div className='spinner-container'>
        <div className='loader'>
          <div className='loader--dot'></div>
          <div className='loader--dot'></div>
          <div className='loader--dot'></div>
          <div className='loader--dot'></div>
          <div className='loader--dot'></div>
          <div className='loader--dot'></div>
          <div className='loader--text'></div>
        </div>
      </div>
    )
  }
}

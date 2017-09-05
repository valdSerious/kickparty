import React, { Component } from 'react'
import moment from 'moment'
// import InputMoment from 'input-moment'

export default class DateTime extends Component {
  static get displayName () {
    return 'DateTime'
  }

  static propTypes () {
    return {}
  }

  constructor (props) {
    super(props)

    this.state = {
      moment: moment()
    }
  }

  handleChange () {

  }

  handleSave () {

  }

  render () {
    return (
      <div>
        <h1>INPUT MOMENT</h1>
        {/* <InputMoment moment={this.state.moment} onChange={this.handleChange} onSave={this.handleSave} />*/}
      </div>
    )
  }
}

import React, { Component } from 'react'
import HeadModifier from '../components/HeadModifier'

export default class ContactPage extends Component {
  static get displayName () {
    return 'ContactPage'
  }

  render () {
    const metaOptions = [{
      property: 'og:description',
      content: "Contact KickParty's Accelerator."
    }]

    return (
      <div style={{padding: '25px'}}>
        <HeadModifier title='Contact KickParty' meta={metaOptions} />
        <h1>Contact KickParty</h1>
        <p>KickParty is in BETA, aka, BRAND NEW, and we have a lot more to do.  If you'd like to contact us in
        the meantime, please give us a buzz via our accelerator, <a href='http://www.elevate.blue'>Elevate Blue</a> at
        (855) 415-BLUE, or shoot us an email to info at kickparty.com.
        </p>
        <p>
          Thanks for checking out our beta and we look forward to you creating the world's most epic events!
        </p>
      </div>
    )
  }
}

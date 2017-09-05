import React, { Component } from 'react'
import HeadModifier from '../components/HeadModifier'

export default class AboutUsPage extends Component {
  static get displayName () {
    return 'AboutUsPage'
  }

  render () {
    const metaOptions = [{
      property: 'og:description',
      content: 'Learn about KickParty.'
    }]

    return (
      <div style={{padding: '25px'}}>
        <HeadModifier title='About KickParty' meta={metaOptions} />
        <h1>What is KickParty?</h1>
          <p>
            Here at KickParty, we're incredibly excited to have built a brand new software platform that makes imagining and organizing an event, collecting money, and sharing that event easier than ever before….and truly epic!!
          </p>
          <p>
            Using KickParty, anyone in the world can be a high end wedding planner, well-known club or concert promoter, senior special events director, or simply the craziest party planner on frat row.  Plan any type of party or event you can dream of, both public or private – throw an insane tailgate, plan a public yacht party with a band and open bar, create a weekend long ski trip with your closest buddies, or plan your best friends bachelor party (and NOT have to bug Jeff to pay you the day before...thanks a lot Jeff :)
          </p>
          <p>
            KickParty brings you a platform with an incredibly simple interface to quickly and easily plan anything, from small birthday dinners to an over the top 30,000-person arena rock show – all you need is the imagination and we’ll do the rest.  You’ll know exactly how many attendees you need to “kick” the party off, and exactly how much they have to pay.  Keep track of who’s in and who’s out…nobody is charged until the price is met!
          </p>
      </div>
    )
  }
}

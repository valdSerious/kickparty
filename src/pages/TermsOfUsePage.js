import React, { Component } from 'react'

export default class TermsOfUsePage extends Component {
  static get displayName () {
    return 'TermsOfUsePage'
  }

  render () {
    return (
      <div style={{padding: '25px'}}>
        <h1>KickParty Terms of Use</h1>

        <p><i>Updated: February 10, 2016</i></p>

        <p><b>Welcome to KickParty!</b></p>

        <p>KickParty is the easiest way to make any event epic. Crowdfund any public or private event, include details about it, collect money, and go!!</p>

        <p>Our Terms of Use are the rules that apply to your use of our services (after this, we’ll call them our <b>Terms</b>). By creating an account, creating a page, or contributing to a page, you agree to these Terms and the following documents, so please read all of them carefully.</p>

        <ul>
        <li>Community Guidelines</li>
        <li>Organizer Guidelines</li>
        <li>Contributor Guidelines</li>
        <li>Acceptable Use Policy</li>
        <li>Stripe’s Terms of Service</li>
        </ul>

        <p>If you don’t agree, please don’t use KickParty.</p>

        <p>_________________________________________________</p>

        <p><i>NOTE: Arbitration Provision and Your Right to Opt Out</i></p>

        <p><i>These Terms include a binding arbitration agreement, which provides that certain disputes between you and KickParty will be resolved through binding individual arbitration and will not be decided by a jury or judge. You have the right to opt out of this part of the Terms by sending us an email, <a href='/contact'>contact us</a>, fully completed in accordance with Section 27, within 90 days of agreeing to these Terms.</i></p>

        <p>_________________________________________________</p>

        <p><b>1. Definitions</b></p>

        <p>Our <b>Services</b> are KickParty.com (including sub-domains, co-branded pages, and international versions), KickParty mobile applications, and any other services, products, applications, widgets, and content linking to these Terms. We further describe our Services on our various websites and apps and in communications with you, such as via emails, FAQS, and text messages.</p>

        <p>An <b>Account</b> is your personal registration with KickParty, through which you can use our Services.</p>

        <p>A <b>user</b> is any natural or legal person that has created an Account through the Services.</p>

        <p>An <b>Organizer</b> is a user who creates or manages an event.</p>

        <p>A <b>Contributor</b> is a user who contributes to a Page, whether or not the party is “kicked”.</p>

        <p>A <b>Page</b> is a solicitation by a user on the Services that is capable of accepting payment transactions from Contributors.</p>

        <p>A Page <b>kicks </b>when enough Contributors have pledged payments to reach the Organizer’s minimum funding goal.</p>

        <p><b>2. Ground Rules</b></p>

        <p>To create or contribute to a Page using the Services, you will need to create an Account with us either via the Services by authenticating through Facebook Connect, or through such similar registration service as we permit from time to time.</p>

        <p>When you register for an Account or use our Services, any information you provide must be true, accurate and complete. You may only use our Services if you are 18 or older.</p>

        <p>Businesses can create accounts on our Services, but the person who creates the account must be able to legally bind the entity. That means you need to have permission from the entity to create an account and agree to these Terms on behalf of the entity. Like all users, businesses must comply with these Terms when using our Services.</p>

        <p>You’re responsible for all activities that occur under your account. KickParty isn’t liable for any loss, damage, or other consequences as a result of your or someone else’s use of your account. You should keep your log-in credentials confidential and never share them with a third party.</p>

        <p><b>3. Organizer Responsibilities</b></p>

        <p>If you’re an Organizer, you have responsibilities and duties to your Contributors. Please review our Organizer Guidelines. In a nutshell, Organizers must be honest and upfront at all times and make best efforts to fulfill their promises to Contributors.</p>

        <p><b>4. Contributor Responsibilities</b></p>

        <p>Contributors have responsibilities and duties, too, so please take a look at our Contributor Guidelines.</p>

        <p>If you’re a Contributor, you make payments to an Organizer at your own risk. Unforeseen or other events may prevent an Organizer from providing goods, services or rewards exactly as promised. If things go awry, please be understanding and consider cutting the Organizer some slack. At the end of the day, though, it’s the Organizer’s responsibility, not KickParty’s.</p>

        <p><b>5. We Are Not Responsible for Some Things</b></p>

        <p>We provide our Services as a neutral platform for users to transact with each other. We’re not directly involved in the transactions between Organizers and Contributors, and do not provide any assurances that Organizers or Contributors will fulfill their obligations to each other or to others. The actions of users are their own, and KickParty doesn’t support, endorse or join them.</p>

        <p>Users may provide links to other websites or resources. If you choose to access them, you do so at your own risk. We don’t control or endorse third-party websites or other resources.</p>

        <p><b>6. Transaction Processing</b></p>

        <p>All Contributor payment transactions are processed and disbursed by Stripe, our third-party payment processor. Stripe may not support all payment methods, currencies or locations, and is solely responsible for its performance of card processing and their related services.</p>

        <p>By agreeing to these Terms, you agree to be bound by <a href='https://stripe.com/us/terms' target='_blank'>Stripe’s Terms of Service</a>. Any breach of those terms will be treated as a breach of these Terms.</p>

        <p>KickParty does not hold or control any funds transacted through the Services, except for service fees (explained below) or as otherwise specifically provided in these Terms. To the extent KickParty receives any funds from Contributors, Organizers appoint KickParty as their limited agent for the receipt of those funds. All such funds will be deemed received by an Organizer upon receipt by KickParty. Organizers will not seek recourse directly from any Contributor for non-payment after that payment is received by KickParty.</p>

        <p>If you are an Organizer using KickParty for business purposes and a Contributor’s payment is subsequently reversed (i.e. a chargeback), you agree to directly pay or reimburse us for the reversed amount and associated fees by the payment processor payable by KickParty. Additionally, a certain amount of your funds may be subject to a hold period with terms determined by your perceived risk and transaction history, which we call a Reserve Amount.</p>

        <p>You are responsible for paying any applicable taxes for your use of the Services.</p>

        <p><b>7. KickParty Fees</b></p>

        <p>We only charge service fees to Organizers and Contributors when a Page kicks and funds are processed. At that point, our fees are deducted from the funds.</p>

        <p>Our fees are listed on the KickParty fees page, with all fees being non-refundable. We will not change our fees for a Page already in progress.</p>

        <p>We have no right to any funds transacted through the Services, except for service fees (explained above) or as otherwise specifically provided in these Terms.</p>

        <p>You may also be subject to fees from third parties for which we are not responsible, such as foreign transaction or exchange fees set by a Contributor’s card issuer, or network or other costs imposed by your telecommunications or internet provider for accessing or using any of the Services.</p>

        <p>You are responsible for paying any applicable taxes or costs for your use of the Services, which are not payable to or through us.</p>

        <p><b>8. Verification and Underwriting</b></p>

        <p>You agree to provide any information and documentation we may reasonably request and to provide true and complete answer to any questions we may reasonably ask you in order to verify your identity and risk. These controls provide important protections to you as well as KickParty, our partners, and other users.</p>

        <p>To verify your identity, we may require additional information including your government provided business or tax identification number or tax and date of birth. The extent applicable, we may also ask for additional information to help verify your identity and assess your business risk including a business plan, business invoices, a driver’s license or other government issued identification, or a business license. We may ask you for financial statements. We may request for your permission to do a physical inspection at your place of business and to examine books and records that pertain to your compliance with this Agreement. Your failure to comply with any of these requests within five (5) days may result in suspension or termination of your KickParty Account.</p>

        <p>By accepting the terms of this Agreement, you authorize us to retrieve information about you by using third parties, including credit bureaus and other information providers. You acknowledge that such information retrieved may include your name, address history, credit history, and other data about you. KickParty may periodically update this information to determine whether you continue to meet our eligibility requirements.</p>

        <p>You agree that KickParty is permitted to contact and share information about you and your application (including whether you are approved or declined) with the applicable payment processors and acquiring institutions. This includes sharing information (a) about your transactions for regulatory or compliance purposes, (b) for use in connection with the management and maintenance of the program, (c) to create and update their customer records about you and to assist them in better serving you, and (d) to conduct KickParty’s risk management process.</p>

        <p><b>9. Our Collection Rights</b></p>

        <p>To the extent permitted by law, you hereby authorize us to and we may collect any obligations you owe us under these Terms by deducting the corresponding amounts from the Reserve Amount or from funds payable to you arising from the settlement of card transactions, including funds from another one or your Stripe or KickParty Accounts. If the settlement amounts or Reserve Amount are not sufficient to meet your obligations to us, we may debit the bank account registered in your KickParty Account for any amounts owed to us. Your failure to fully pay amounts that you owe us on demand is a material breach of these Terms and you will be liable for our costs associated with collection in addition to the amount owed, including without limitation attorneys’ fees and expenses, costs of any arbitration or court proceeding, collection agency fees, and any applicable interest.</p>

        <p>In some cases, we may require a personal guarantee from a principal from your business as a condition of our continuing to provide the KickParty Services to you. If a personal guarantee is necessary, we will specifically inform you in advance.</p>

        <p><b>10. Reserves</b></p>

        <p>KickParty may, in its sole discretion, set the terms of your Reserve Amount and notify you of such terms, which may require that a certain amount (including the full amount) of the funds received for your transaction is held for a period of time or that additional amounts are held in a Reserve Amount. KickParty, in its sole discretion, may elect to change the terms of the Reserve Amount at any time for any reason based on your payment processing history or as requested by our payment processors.</p>

        <p>KickParty may fund the Reserve Amount through (i) funds owed to you for transactions submitted through the KickParty Service, (ii) debiting your bank account, (iii) through other sources associated with your KickParty Account, or (iv) requesting that you provide funds to KickParty for deposit.</p>

        <p><b>11. Security Interest</b></p>

        <p>You grant us a lien and security interest in the Reserve Amount, all transactions (including future transactions), any rights to receive credits or payments under these Terms, and all deposits and other property of yours possessed or maintained by us on your behalf. You will execute, deliver, and pay the fees for any documents we request to create, perfect, maintain and enforce this security interest, even if such request is made after you have established a negative balance with KickParty or the applicable payment processes, such as Stripe.</p>

        <p><b>12. Text Messaging</b></p>

        <p>KickParty users may use the Services to send you text messages from time to time. By signing up to use KickParty, you acknowledge and agree that KickParty does not send or initiate such text messages sent to you by a user. Further, by signing up to use KickParty, you agree to receive voice calls and text messages about our Services from us via automatic telephone dialing system and artificial/pre-recorded message at the telephone number you provided as part of your profile on the Services. If you don't want to receive these calls and texts, just indicate so in your account or email us. You understand that your consent to receive communications in this way isn’t required as a condition to using the Services.</p>

        <p>You may also wish to send text messages to other KickParty users through the Services. You acknowledge and agree that you, and not KickParty, are sending and initiating such text messages. You represent and warrant that every person to whom you send a text message through the Services has given you written consent to receive such messages.</p>

        <p><b>13. Privacy</b></p>

        <p>Your privacy is important to us. To learn about how we handle your personal information, see our Privacy Policy.</p>

        <p><b>14. Prohibited Activities</b></p>

        <p>We strive to maintain a great community. To that end, we require you to respect these limitations and we may terminate your account if you don’t follow them.</p>

        <ul>
        <li>Don’t use our Services in a manner that violates any laws, regulations, ordinances, or directives.</li>
        <li>Don’t use our Services contrary to these Terms or our Community Guidelines, Organizer Guidelines, Contributor Guidelines, and Acceptable Use Policy.</li>
        <li>Don’t lie to or mislead other users.</li>
        <li>Don’t do anything threatening, abusive, harassing, defamatory, tortious, obscene, profane, or invasive of another person’s privacy.</li>
        <li>Don’t distribute unsolicited or unauthorized advertising or promotional material, junk mail, spam, or chain letters. Don’t run mail lists, listservs, or any kind of auto-responder or spam on or through our Services.</li>
        <li>Don’t interfere with the proper functioning of any software, hardware, or equipment on our Services (whether it belongs to KickParty or anyone else).</li>
        <li>Don’t impersonate KickParty or our users on our Services or elsewhere.</li>
        <li>Don’t engage in any conduct that inhibits anyone's use or enjoyment of our Services, or which we determine may harm KickParty or our users.</li>
        <li>Don’t send or receive funds that are or are likely to be fraudulent.</li>
        <li>Don't cylce funds using a prepaid card.</li>
        <li>Don’t use our Services in a way that is likely to result in complaints, disputes, claims, reversals, chargebacks, fees, fines, penalties, or any liability to KickParty, you, or anyone else.</li>
        <li>Don’t use personal information about other users, including but not limited to their names, email addresses, and postal addresses, except as permitted in connection with the Services.</li>
        </ul>

        <p><b>15. Our Rights</b></p>

        <p>We’re always working to improve KickParty and make our Services better, so we reserve some rights. In our sole discretion, we may, at any time, with or without notice:</p>

        <ul>
        <li>Change, eliminate or restrict access to our Services.</li>
        <li>Refuse service to anyone or terminate user accounts.</li>
        <li>Modify, suspend, close, or remove a Page.</li>
        <li>Cancel or refund any contribution to any Page.</li>
        </ul>

        <p>We periodically review these Terms and may change them from time to time. If we make material changes, we’ll notify you as required by law. If you continue using the Services after notice is provided, you accept the new Terms. If we are required to amend these Terms more quickly by law (i.e., a result of a court decision), we may do so and notify you as soon as possible before or afterwards.</p>

        <p><b>16. How to Disable Your Account</b></p>

        <p>You can disable your account at any time by logging into your account and updating your profile settings. You must disable your own account. We can’t do it for you.</p>

        <p>After you disable your account, your Page will no longer be visible on our Services. However, we retain the content you provided us and the rights to use that content as described in these Terms. For example, contributions to Pages you organized will still appear in the Contributor’s contribution history. We may also retain information as required by law or regulation, our payments vendors’ requirements, or our own retention practices.</p>

        <p><b>17. Terminated and Abandoned Accounts</b></p>

        <p>You can stop using our Services and end your agreement with us at any time without charge, upon which time we will disable your account. However, you will be responsible for any contractual obligations, fees, taxes, or costs that you incurred or authorized before you stopped using the Services.</p>

        <p>If you don’t log in to your account for two or more years, we may disable your account and terminate this agreement without notice.</p>

        <p>If this agreement is terminated (whether by us or by you), we will disable your account and inform the third-party payment processor so they can, as appropriate and set out in their terms of use, refund or forward any remaining funds to your primary address (if we have it).</p>

        <p><b>18. KickParty’s Intellectual Property and Other Rights</b></p>

        <p><b><i>18.1. KickParty Content and Branding</i></b></p>

        <p>Our Services are protected by copyright, trademark, patent, and other intellectual property laws. KickParty gives you a worldwide, non-transferable, and revocable license to use the Services we provide you solely as permitted by these Terms. Any rights not expressly granted herein are reserved.</p>

        <p>Unauthorized use of any of KickParty’s trademarks, logos, domain names or other distinctive brand features are prohibited. See our Brand Guidelines for more information.</p>

        <p><b><i>18.2. User Content</i></b></p>

        <p>We allow users to provide a range of content to and in connection with our Services depending on the service, <b>user content</b>, such as posts videos, photos, text, images, and designs. You retain all rights in and are solely responsible for your user content. By posting user content on our Services, you represent that you have the legal right to do so and are not infringing the intellectual property rights of others.</p>

        <p>You expressly grant KickParty a worldwide, non-exclusive, perpetual, irrevocable, royalty-free, sub-licensable, transferable right to use, reproduce, modify, publish, list information regarding, edit, translate, distribute, publicly perform, publicly display, and make derivative works of your user content.</p>

        <p>Nothing in these Terms shall restrict other legal rights KickParty may have to user content (for example, under other licenses). We reserve the right to remove or modify user content for any reason, including because we believe it violates these Terms or any of our written policies.</p>

        <p><b><i>18.3. Subdomains</i></b></p>

        <p>KickParty may provide you with temporary use of a subdomain on our Services. You don’t obtain rights of any kind in or to the subdomain. We may withdraw the availability of a subdomain at any time. You will hold us harmless for any and all use of the subdomain and any services or content in relation to it.</p>

        <p><b><i>18.4. Copyright Takedown Notices and Counter Notices</i></b></p>

        <p>KickParty complies with the Digital Millennium Copyright Act. It is KickParty's policy, in appropriate circumstances and at KickParty’s sole discretion, to disable the accounts of users who repeatedly infringe the copyrights or other intellectual property rights of others. To learn more, please visit our Copyright Policy. If you believe someone is infringing your trademarks, please also follow the procedures in our Copyright Policy.</p>

        <p><b>19. Warranties and Disclaimers</b></p>

        <p>YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. KICKPARTY EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, FITNESS FOR A PARTICULAR PURPOSE, AND TITLE, AND ANY WARRANTIES THAT MAY BE IMPLIED BY ANY COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE.</p>

        <p>KickParty doesn’t represent, warrant, or guarantee the accuracy, completeness, or usefulness of the Services, and you rely on the Services at your own risk. Any material transmitted, accessed, or stored through use of the Services is done at your own discretion and risk and you are solely responsible for any damage or loss of data that results from the transmission, access, or storage of any material through the Services. No advice or information, whether oral or written, obtained by you from KickParty or through or from the Services creates any warranty not expressly stated in this agreement. Some jurisdictions don’t allow the disclaimer of implied warranties in contracts, so the contents of this section may not apply to you. Nothing in this section is intended to limit any rights you may have which may not be lawfully limited.</p>

        <p><b>20. Indemnity</b></p>

        <p>You agree to defend, indemnify, and hold harmless KickParty and KickParty subsidiaries and our officers, directors, agents, partners, and employees from any and all claims, damage, loss, liability, cost, and expenses (including attorney and professional fees) resulting from any demand, claim, investigation, or proceeding arising out of, related to, or in connection with the following, without limitation: (A) your use of the Services, (B) your breach of these Terms, or of any representation or warranty contained herein, (C) your violation of any third-party right, including, without limitation, any intellectual property right, publicity, confidentiality, property or privacy right, (D) your violation of any laws, rules, regulations, codes, statutes, ordinances, or orders of any governmental or quasi-governmental authorities, including, without limitation, all regulatory, administrative and legislative authorities, or (E) any misrepresentation made by you. KickParty will give you notice of any such matter; however, any failure or delay by us doesn’t negate your defense or indemnification obligations or waive KickParty’s rights to seek payment for defense or indemnification from you. We reserve the right to assume the exclusive defense and control of any matter that is subject to defense or indemnification, and you agree to cooperate fully in the defense of any such claim, demand, investigation, proceeding, or matter. You will not settle any claim that affects KickParty or any of the parties listed above without KickParty’s prior written approval.</p>

        <p><b>21. Limitations of Liability</b></p>

        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, KICKPARTY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, GOODWILL OR OTHER INTANGIBLE LOSSES RESULTING FROM (A) YOUR ACCESS TO, USE OF, INABILITY TO ACCESS OR INABILITY TO USE OUR SERVICES; (B) ANY CONDUCT OR CONTENT OF ANY USER OF OR THIRD PARTY ON OUR SERVICES OR ANY PAYMENT PROCESSOR, INCLUDING WITHOUT LIMITATION ANY DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES OR CONDUCT THAT VIOLATES THE COMMUNITY GUIDELINES, ORGANIZER GUIDELINES OR CONTRIBUTOR GUIDELINES; (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT; (D) ANY INACCURATE INFORMATION POSTED ON OUR SERVICES; OR (E) OUR DECISION TO PUBLISH OR REMOVE ANY INFORMATION ON OUR SERVICES. NO CIRCUMSTANCES SHALL KICKPARTY’S TOTAL LIABILITY OF ALL KINDS ARISING OUT OF OR RELATED TO THESE TERMS OR OUR SERVICES (INCLUDING BUT NOT LIMITED TO WARRANTY CLAIMS), REGARDLESS OF THE FORUM AND REGARDLESS OF WHETHER ANY ACTION OR CLAIM IS BASED ON CONTRACT, STATUTE, TORT, OR OTHERWISE, AND WHETHER OR NOT KICKPARTY HAS BEEN INFORMED OF THE POSSIBILITY OF ANY SUCH DAMAGE, EXCEED THE GREATER OF ONE HUNDRED U.S. DOLLARS (US $100) OR THE AMOUNT OF FEES YOU PAID KICKPARTY IN DIRECT CONNECTION WITH YOUR USE OF THE SERVICES DURING THE THREE-MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM FOR LIABILITY. BECAUSE SOME STATES DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY, THE ABOVE LIMITATION MAY NOT APPLY TO YOU.</p>

        <p>If you have a dispute with any user, including, but not limited to, any Organizer or Contributor, arising out of, in connection with, or regarding your or their use of the Services, you agree to release KickParty (and our parent, our affiliates and our and their respective officers, directors, agents, joint ventures, employees and suppliers) from any and all claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes. You expressly waive any protections of any state or territory (whether statutory or otherwise) that would otherwise limit the coverage of this release to include only those claims that you may know or suspect to exist in your favor at the time of agreeing to this release.</p>

        <p>If you are a Nevada resident, you acknowledge that you have read and understand, and expressly waive, the benefits of Nevada Civil Code, which states, “A general release does not extend to claims which the creditor does not know or suspect to exist in his or her favor at the time of executing the release, which if known by him or her must have materially affected his or her settlement with the debtor.”</p>

        <p><b>22. Law Governing Legal Disputes</b></p>

        <p>The laws of the State of California govern this agreement, as well as any dispute, claim, or controversy that may arise between you and KickParty, without regard to conflict of law provisions.</p>

        <p><b>23. Arbitration</b></p>

        <p>We’d like to resolve any disputes fairly, quickly, and with minimal fuss. Toward that end, if you have any issue with KickParty, please contact us and we’ll try to work with you to resolve the matter informally.</p>

        <p>To the extent permitted by law, you agree to file any claim you may have against KickParty within one year after such claim arose. Otherwise, your claim is permanently barred.</p>

        <p>If we can’t solve that dispute informally, and if you are a resident of or have your principal place of business in the United States, you and KickParty agree to resolve any claim against each other through final and binding arbitration, including a claim involving KickParty’s affiliates, officers, directors, employees and agents, and its affiliates’ officers, directors, employees and agents.</p>

        <p>You and KickParty agree to submit the dispute to a single arbitrator under the Commercial Arbitration Rules of the American Arbitration Association (AAA), including the Optional Rules for Emergency Measures of Protection and the Supplementary Procedures for Consumer-Related Disputes, or, by separate mutual agreement, to another arbitration institution.</p>

        <p>The AAA’s rules and a description of the arbitration process are available at www.adr.org.</p>

        <p>The location of the arbitration and the allocation of fees and costs shall be determined under the AAA rules. However, KickParty will reimburse you for all AAA administrative fees in disputes that are subject to the Supplementary Procedures for Consumer-Related Disputes unless the arbitrator determines that a claim or counterclaim was filed for purposes of harassment or is patently frivolous.</p>

        <p>The award rendered by the arbitrator shall include costs of arbitration, reasonable attorneys' fees and reasonable costs for expert and other witnesses. However, if your claim for damages does not exceed $75,000, KickParty will pay for all reasonable filing, administrative, and arbitrator fees, as long as the arbitrator determines that your claim is non-frivolous. If you win an arbitration award that’s more generous than any offer we made to settle the dispute, KickParty will pay you an extra $1,500 on top of the award. Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.</p>

        <p>If you opt out of the arbitration agreement (as provided below), or if the arbitration agreement is found to be unenforceable, or if you neither are a resident nor have a principal place of business in the United States, you agree to resolve any claim you have with KickParty exclusively in a state or federal court located in the City and County of San Francisco, California. You agree to submit to the personal jurisdiction of the courts located in the City and County of San Francisco, California for purpose of litigating all such disputes.</p>

        <p>Nothing in this section shall prevent either party from seeking injunctive or other equitable relief from the courts for matters related to data security, intellectual property, or unauthorized access to the Services.</p>

        <p>This arbitration agreement will survive the termination of your Services.</p>

        <p><b>24. Arbitrator Will Decide Arbitrability</b></p>

        <p>The Federal Arbitration Act governs the arbitrability of all disputes between you and KickParty. The arbitrator will decide whether the dispute can be arbitrated.</p>

        <p><b>25. Class Action Waiver</b></p>

        <p><b><i>You and KickParty agree that each may bring a dispute against the other only in an individual capacity and not on behalf of any class of people. You and KickParty agree not to participate in a class action, a class-wide arbitration, claims brought in a representative capacity, or consolidated claims involving another person’s account. You and KickParty agree not to combine a claim subject to arbitration under this agreement with a claim that is not eligible for arbitration under this agreement.</i></b></p>

        <p><b><i>If this prohibition against class actions and other claims brought on behalf of third parties is found to be unenforceable, then the arbitration agreement in Section 23 and 24 will be null and void.</i></b></p>

        <p><b>26. Trial Waiver</b></p>

        <p><b><i>You and KickParty agree to waive the right to a trial by jury for all disputes.</i></b></p>

        <p><b>27. Your Right to Opt Out of Arbitration</b></p>

        <p><b><i>You may opt out of the agreement to arbitrate. If you do so, neither you nor KickParty can require the other to participate in an arbitration proceeding. To opt out, you must notify KickParty within 90 days of the date that you first agreed to these updated Terms. You can submit your notice either by mail or online via our <a href='/contact'>contact page</a>.</i></b></p>

        <p><b><i>To opt out by mail, send your written opt-out notice to this address:</i></b></p>

        <p><b><i>KickParty <br />
        Attn: Arbitration Opt-Out <br />
        885 Tahoe Blvd. <br />
        Incline Village, NV 89451</i></b></p>

        <p><b><i>Your written opt-out notice must include (1) your name and residence address, (2) the email address and/or mobile telephone number associated with your account, (3) a clear statement that you want to opt out of this arbitration agreement, and (4) your signature.</i></b></p>

        <p><b>28. Geographic Restrictions</b></p>

        <p>You agree to comply with all laws, restrictions, and regulations relating to the export of products and information. For purposes of the U.S. Export Administration Act Export Laws, you warrant that you are: (a) not a citizen of, or otherwise located within, an embargoed nation (including without limitation the Office of Foreign Assets Control comprehensively embargoed countries of Iran, Syria, Cuba, North Korea and Sudan and certain Specially Designated Nationals listed by OFAC as updated from time to time and (b) not otherwise prohibited under the export laws from receiving such products and information.</p>

        <p><b>29. Feedback</b></p>

        <p>We always appreciate your feedback or other suggestions about KickParty. You can email your feedback via the <a href='/contact'>contact page</a> on our site. We aren’t obligated to compensate you for your feedback.</p>

        <p><b>30. Software Updates</b></p>

        <p>You agree that software of ours that you download, such as a stand-alone software product, an application, or a browser plugin, may periodically download and install upgrades, updates and additional features from us in order to improve, enhance, and further develop that software.</p>

        <p><b>31. Other</b></p>

        <p>These Terms (and any other terms of use or service, policies or guidelines we refer to in this document) make up the entire agreement between you and KickParty, and supersede any prior agreements. If any part of these Terms is found to be unenforceable, the remaining parts will remain in full force and effect. If we fail to enforce any of these Terms, it will not be considered a waiver. Any change to or waiver of these Terms must be made in writing and signed by us. You will not transfer any of your rights or obligations under these Terms to anyone else without our prior written consent. Nothing in these Terms shall prevent us from complying with the law.</p>

        <p>To the extent permitted by applicable law, we may freely assign all of our rights and obligations under these Terms in connection with a merger, acquisition, or sale of assets, or by operation of law or otherwise.</p>

        <p>If you are resident of or are locate or have a principal business in the United States, these Terms are between you and KickParty, which is located at 885 Tahoe Blvd, Incline Village, NV 89451.</p>

      </div>
    )
  }
}

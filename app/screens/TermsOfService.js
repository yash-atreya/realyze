/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import SecondaryHeader from '../components/SecondaryHeader';

class TermsOfServiceScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <SecondaryHeader secondaryHeaderTitle="Terms of Service" />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.5}} />
          <View style={{flex: 8, flexDirection: 'column'}}>
            <ScrollView>
              <Text>
              Terms of Service
              </Text><Text>
Thanks for using our products and services (“Services”). The Services are provided by Realyze, its website, app or other offerings, mentioned thereof as platform, owned and operated by Yash Atreya, an Indian citizen, residing at C-304, Karachi Citizens Society, Juhu Versova Link Road, Andheri West, Mumbai - 400053, India.
</Text><Text>
By using our Services, you are agreeing to these terms. Please read them carefully. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
</Text><Text>
For the purpose of this policy, wherever the context so requires,
</Text><Text>
1.	The term ‘You’ & ‘User’ shall mean any legal person or entity accessing or using the services or offerings provided on Realyze’s App, Website or any affiliated offerings.
2.	The term ‘company’ refers to the collective of app/ website or any other platform in the context of Realyze, that Mr Yash Atreya and the team/ persons affiliated to him owns/ operates.
3.	The terms ‘We’, ‘Us’ & ‘Our’ shall mean the Website and/or the Company, as the context so requires.
4.	That ‘Platform’ shall refer to the offerings of the company, like the app, website or any other platform that the company owns/ operates.
5.	The terms ‘Party’ & ‘Parties’ shall respectively be used to refer to the User and the Company individually and collectively, as the context so requires.
6.	The headings of each section in this Policy are only for the purpose of organizing the various provisions under this Policy in an orderly manner, and shall not be used by either Party to interpret the provisions contained herein in any manner. Further, it is specifically agreed to by the Parties that the headings shall have no legal or contractual value.
7.	The use of the website or app by the user is solely governed by this Policy (Privacy Policy), Refund and Cancellation Policy and the ‘Terms and Conditions’ of the website, and any modifications or amendments made thereto by the company from time to time, at its sole discretion.
</Text><Text>
Accuracy and Completeness of Information:
</Text><Text>
Realyze’s platform is designed and developed to keep the content, documents and information error-free. However, we do not represent or warrant that the service will be error-free, free of viruses or other harmful components, or that defects will be corrected. The company may make improvements and/or changes to its features, functionality or service at any time.
</Text><Text>
Additionally, the material on the platform is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on the platform is at your own risk.
</Text><Text>
Privacy and Copyright Protection
</Text><Text>
The company’s privacy policy explains and outlines the relationship between the company and the user data. The company strives hard to protect the user’s privacy on using it’s products and services. By using our Services, you agree that Realyze can use such data in accordance with its privacy policies.
</Text><Text>
User’s content
</Text><Text>
Our platform allows you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours.
</Text><Text>
About Platform updates
</Text><Text>
When a Service requires or includes downloadable software, this software may update automatically on your device once a new version or feature is available. Some Services may let you adjust your automatic update settings.
Products or Services
</Text><Text>
The company makes efforts to include and provide every information needed to avail the service as clear and defined as possible. However, it does not guarantee that the service will be made available in the same way described. The user is also informed that the steps and process might differ from time to time.
</Text><Text>
We reserve the right but are not obligated, to limit our products or services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis as needed or deemed right.
</Text><Text>
User Comments, Feedback and other submissions
</Text><Text>
The company might ask the users, at times to submit/ send certain submissions in terms of feedback, surveys or any such article available. The user agrees that the company may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments, feedback, inputs that you forward to us.
</Text><Text>
However, the company takes no responsibility and assume no liability for any comments posted by the user or any third party. The user hereby agrees that the comments they make will not violate any rights of any third party, including copyright, trademark, privacy, personality or any other personal and proprietary rights.
</Text><Text>
Prohibited Uses
</Text><Text>
In addition to the terms laid out in the Terms of Service, the user is prohibited from using the site or its content:
</Text><Text>
1.	for any unlawful purpose;
2.	to solicit others to perform or participate in any unlawful acts;
3.	to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;
4.	to infringe upon or violate our intellectual property rights or the intellectual property rights of others;
5.	to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;
6.	to submit false or misleading information;
7.	to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet;
8.	to collect or track the personal information of others;
9.	to spam, phish, pharm, pretext, spider, crawl, or scrape;
10.	for any obscene or immoral purpose; or
11.	to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet.
The company reserves the right to terminate your use of the Service or any related website for violating any of the prohibited uses. The company is also not responsible for any malicious use of its features and offerings by the user.
</Text><Text>
Modifying and Terminating our Services
</Text><Text>
The company reserves the right to update or modify its services and offerings at its sole discretion. The company is also not obliged to intimate the user of any change unless the user is affected materially. The decision of the Executive Committee of the company will be final in any conflicting situation. The company may add or remove functionalities or features or may suspend or stop a Service altogether.  The user has the right to stop using the company’s Services at any time.
</Text><Text>
The company shall not be liable to you or any third-party for any modification, price change, suspension or discontinuance of the Service.
The user, hereby agree:
</Text><Text>
1.	That the company may remove the service for indefinite periods of time or cancel the service at any time, without any notice to the user.
2.	That their use of, or inability to use the service or any of the company’s offering is at their sole risk.
Termination
You may use our Services only as permitted by law, including applicable laws and regulations. We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
These Terms of Service are effective unless and until terminated by either the company or the user. The user may terminate these Terms of Service at any time by notifying the company that they no longer wish to use the company’s services, or when they cease using the site and its affiliated offerings.
</Text><Text>
Ownership
</Text><Text>
The platforms and services are owned and operated by Yash Atreya, an Indian citizen, residing at C-304, Karachi Citizens Society, Juhu Versova Link Road, Andheri West, Mumbai - 400053, India. All right, title and interest in and to the materials provided on this Site, including but not limited to information, documents, logos, graphics, sounds and images (the "Materials") are owned by the company except as otherwise expressly provided by the company, none of the materials may be copied, reproduced, republished, downloaded, uploaded, posted, displayed, transmitted or distributed in any way and nothing on this Site shall be construed to confer any license whether by estoppel, implication or otherwise.
Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access. You may not use content from our Services unless you obtain permission from its owner or are otherwise permitted by law. These terms do not grant you the right to use any branding or logos used in our Services. Don’t remove, obscure, or alter any legal notices displayed in or along with our Services.
</Text><Text>
Dispute Resolution and Jurisdiction
</Text><Text>
Any controversy or claim arising out of or relating to this agreement or the company services shall be settled by binding arbitration in accordance with the laws of India. The presence of company’s operational office and servers is in India and obliged to the Indian laws.
Any such controversy or claim shall be arbitrated on an individual basis, and shall not be consolidated in any arbitration with any claim or controversy of any other party.
</Text><Text>
In case any terms of service are not covered in this Terms of service but are necessary to be called upon in matters of conflict with any user, the decision of the Executive Committee will be final in the concerning matter unless instructed otherwise by the competent court.
Any other dispute or disagreement of a legal nature will also be decided in accordance with the laws of India, and the Courts of Maharashtra shall have jurisdiction in all such cases.
</Text><Text>
Changes to the terms of service
</Text><Text>
The company retains the sole and exclusive rights to amend or modify the Policy and the aforementioned Terms without any prior permission or intimation to the user and the user expressly agrees that any such modifications and updates shall come into effect immediately. The user can review the most recent version of the Terms of Service at any time on this page to avoid any conflict of interest.
However, if we make any material or substantial changes, we will place a prominent notice on our website/ application. If the change materially affects the user, we will send a notice to you by email.
</Text><View style={{marginBottom: 150}} />

            </ScrollView>
          </View>
          <View style={{flex: 0.5}} />
        </View>
      </View>
    );
  }
}

export default TermsOfServiceScreen;
{
  /* <Button
  title="Go Back to Settings from Terms and Conditions"
  onPress={() => this.props.navigation.navigate('Settings')}
/> */
}
{
  /* <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('7.7%'),
  }}>
  <View>
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Settings')}>
      <Icon
        name="ios-arrow-back"
        // size={Platform.OS === 'ios' ? 34 : 30}
        size= {34}
        color={'#000000'}
      />
    </TouchableOpacity>
  </View>
  <View style={{marginLeft: wp('8%'), alignSelf: 'center'}}>
    <Text style={[styles.h1PSBB, {fontSize: 24, color: '#000000'}]}>
      Terms and Conditions
    </Text>
  </View>
</View> */
}

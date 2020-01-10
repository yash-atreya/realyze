import React, {Component} from 'react';
import {View, TextInput, Button} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  async sendEmail() {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'https://realyze.page.link/authentication_link',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.realyze',
      },
      android: {
        packageName: 'com.realyze',
        installApp: true,
        minimumVersion: '12',
      },
      dynamicLinkDomain: 'realyze.page.link',
    };
    try {
      await AsyncStorage.setItem('email', `${this.state.email}`);
      console.log('email saved');
      await auth().sendSignInLinkToEmail(
        `${this.state.email}`,
        actionCodeSettings,
      );
      console.log('email sent');
    } catch (e) {
      console.log(e);
    }
  }

  //   handleAuthLink = async link => {
  //     console.log('link: ', link.url);

  //     if (auth().isSignInWithEmailLink(link)) {
  //       console.log('link is tru');
  //       try {
  //         await auth()
  //           .signInWithEmailLink(`${this.state.email}`, link.url)
  //           .then(() => {
  //             console.log('USer created');
  //           })
  //           .catch(err => {
  //             console.log('EROR: ', err);
  //           });
  //       } catch (err) {
  //         console.log('err: ', err);
  //       }
  //     } else {
  //       console.log('link is false');
  //     }
  //   };

  //   authLink = dynamicLinks().onLink(this.handleAuthLink);

  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          style={{color: 'blue'}}
          onChangeText={email => this.setState({email: email})}
          textContentType="emailAddress"
        />
        <Button title="Verify Email" onPress={() => this.sendEmail()} />
      </View>
    );
  }
}
export default AuthScreen;

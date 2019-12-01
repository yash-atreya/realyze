import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      username: '',
      loading: Boolean,
      isOnline: Boolean,
    };

    this.netInfo(); //Subscribe instead
  }

  netInfo() {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        this.setState({isOnline: true});
      } else {
        this.setState({isOnline: false});
      }
    });
  }

  // componentDidMount() {}

  onSignIn() {
    const {email, password} = this.state;
    console.log(email);
    console.log(password);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.updateToken())
      .then(() => {
        console.log('=======Signed In========');
        this.props.navigation.navigate('Profile');
      })
      .catch(err => {
        console.log('ERROR SIGNING IN');
        console.log(err);
      });
  }

  updateToken = async () => {
    const uid = auth().currentUser.uid;
    const token = await messaging().getToken();
    console.log('UPDATETOKEN(_)');
    firestore()
      .collection('Users')
      .doc(`${uid}`)
      .get()
      .then(doc => {
        var currentTokens = doc.data().fcmTokens || {};
        if (!currentTokens[token]) {
          var tempTokens = currentTokens;
          tempTokens = {
            [token]: true,
          };
          firestore()
            .collection('Users')
            .doc(`${uid}`)
            .update({fcmTokens: tempTokens})
            .then(() => console.log('new Token updated'));
        } else {
          console.log('Token already exists');
        }
      });
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Log In</Text>
        <TextInput
          onChangeText={email => this.setState({email: email})}
          placeholder="username or email"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          onChangeText={password => this.setState({password: password})}
          secureTextEntry
          placeholder="password"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <Button
          title="Login"
          onPress={() => {
            this.onSignIn();
          }}
        />
        <Button
          title="Or SignUp"
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}
        />
      </View>
    );
  }
}

export default LogInScreen;

/* NOTES 
Setup Forgot paswword or email?
*/

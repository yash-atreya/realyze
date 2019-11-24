import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    console.log('REGISTER SCREEN');

    this.state = {
      email: '',
      password: '',
      error: '',
      username: '',
      loading: Boolean,
      isOnline: Boolean,
    };
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (state.isInternetReachable) {
        this.setState({isOnline: true});
      } else {
        this.setState({isOnline: false});
      }
    });
  }

  onSignUp() {
    if (
      this.state.email === '' ||
      this.state.password === '' ||
      this.state.username === ''
    ) {
      //SHOW ALERT @TANAY
    } else {
      const {email, password} = this.state;
      console.log(email);
      console.log(password);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('=======Signed UP========');
          this.props.navigation.navigate('Profile');
        })
        .then(() => {
          this.onEmailVerification();
          this.onCreateUser();
          this.setupMetrics();
        })
        .then(() => this.props.navigation.navigate('Profile'))
        .catch(err => {
          console.log('ERROR SIGNING UP');
          console.log(err);
        });
    }
  }

  onCreateUser() {
    const {email, username} = this.state;
    console.log('onCreateUser()');
    var uid = auth().currentUser.uid;
    auth()
      .currentUser.updateProfile({
        displayName: username,
      })
      .then('Display Name Updated')
      .catch(err => console.log('Display Name', err));
    firestore()
      .collection('Users')
      .doc(`${uid}`)
      .set({
        email: email,
        username: username,
      })
      .then(console.log('Document Written in db'))
      .catch(err => console.log('error writing document', err));
  }
  setupMetrics() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Metrics')
      .doc(`${uid}`)
      .set({
        totalTasks: null,
        totalCompleted: null,
        beforeDeadline: null,
        afterDeadline: null,
        notCompleted: null,
      })
      .then(() => console.log('Metrics are set'))
      .catch(err => console.log('err setting up metrics', err));
  }
  onEmailVerification() {
    auth()
      .currentUser.sendEmailVerification()
      .then(() => console.log('Email Verification sent'))
      .catch(error => console.log('Email Not Sent' + error));
  }
  render(props) {
    console.log(props);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Sign Up</Text>
        <TextInput
          onChangeText={email => this.setState({email: email})}
          placeholder="email"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          onChangeText={password => this.setState({password: password})}
          secureTextEntry
          placeholder="password"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />

        <TextInput
          placeholder="username"
          onChangeText={username => this.setState({username: username})}
          style={{
            height: 40,
            width: 100,
            borderColor: 'gray',
            borderWidth: 1,
          }}
        />

        <Button
          title="Sign Up"
          onPress={() => {
            this.onSignUp();
          }}
        />
      </View>
    );
  }
}

export default SignUpScreen;

/* NOTES

*/

import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    console.log('SIGN UP SCREEN');

    this.state = {
      email: '',
      password: '',
      error: '',
      username: '',
      loading: false,
      isOnline: Boolean,
    };
  }

  componentDidMount() {
    this.registerNotif().then(() => this.requestPermission());
  }

  subscribeNetInfo = NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
    if (state.isConnected === false) {
      this.setState({isOnline: false});
      console.log('isOnline: false');
    } else {
      this.setState({isOnline: true});
      console.log('isOnline: true');
    }
  });

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
          // this.saveToken();
        })
        .then(() => this.props.navigation.navigate('Profile'))
        .catch(err => {
          console.log('ERROR SIGNING UP');
          console.log(err);
        });
    }
  }

  onCreateUser = async () => {
    const {email, username} = this.state;
    console.log('onCreateUser()');
    var uid = auth().currentUser.uid;
    const token = await messaging().getToken();
    console.log(token);
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
        fcmTokens: {
          [token]: true,
        },
        friendRequests: false,
        reminders: false,
      })
      .then(console.log('Document Written in db'))
      .catch(err => console.log('error writing document', err));
  };
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

  // saveToken() {
  //   const uid = auth().currentUser.uid;
  //   const token = messaging().getToken();
  //   firestore()
  //     .collection('Users')
  //     .doc(`${uid}`)
  //     .set({
  //       fcmTokens: {
  //         [token]: true,
  //       },
  //     })
  //     .then(() => console.log('token is stored'))
  //     .catch(err => console.log('err saving token'));
  // }

  registerNotif = async () => {
    try {
      if (messaging().isRegisteredForRemoteNotifications) {
        await messaging()
          .registerForRemoteNotifications()
          .then(() => console.log('registered'));
      }
    } catch {
      console.log('error registering for notifications');
    }
  };

  requestPermission = async () => {
    try {
      const hasPermission = await messaging().hasPermission();
      if (hasPermission) {
        console.log('hasPermission');
      } else {
        try {
          await messaging()
            .requestPermission()
            .then(() => {
              console.log('permission granted');
            });
        } catch {
          console.log('err granting permission');
        }
      }
    } catch {
      console.log('user denied permission');
    }
  };
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

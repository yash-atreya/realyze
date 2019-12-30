import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

//3rd Party Libraries--------------------------------------
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import Logo from '../components/Svg Components/Logo';

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
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor:'#E9EBF1'}}>
        <View style={{position: 'absolute', left: '-20%', top: '5%'}}>
          <Logo />
        </View>
        <View>
          <View style={[buttonStyles.indicatorButton]}>
            <Text style={[styles.bcRBB, {fontSize: 15}]}>OFFLINE</Text>
          </View>
        </View>
        <Text style={[styles.bcRBB, {fontSize: 50, marginTop: hp('11.78%')}]}>
          Welcome
        </Text>
        <KeyboardAvoidingView
          enabled
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? '54' : '0'}>
          <Text
            style={[
              styles.h1PSBB,
              {fontSize: 24, marginTop: hp('16%'), alignSelf: 'center'},
            ]}>
            LOGIN/SIGNUP
          </Text>
          <TextInput
            placeholder="Email-id"
            placeholderTextColor="#333647"
            style={[
              textInput.generalTextInput,
              {marginTop: hp('2.339%'), color: '#333647'},
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="done"
            on
          />
          <Text style={{marginTop: hp('1%'), alignSelf: 'center'}}>
            (We use Passwordless Authentication!)
          </Text>
          {/* <Button
          title="Go to MainStack"
          onPress={() => this.props.navigation.navigate('AllTasks')}
        /> */}
          <View style={{marginTop: hp('5%')}}>
            <PrimaryButton title="Verify Email" onPress="Username" />
          </View>
          <Text style={{marginTop: hp('1%'), alignSelf: 'center'}}>
            (Check Your Inbox to go ahead in the app)
          </Text>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default LogInScreen;

/* NOTES 
Setup Forgot paswword or email?
*/

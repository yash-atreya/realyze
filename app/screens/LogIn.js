/* eslint-disable react-native/no-inline-styles */
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
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles, textInput} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import Logo from '../components/Svg Components/Logo';
import OfflineIndicator from '../components/OfflineComponent';

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
        {/* Offline Indicator Position Absolute */}
        <View style={{position:'absolute', alignSelf:'center'}}>
          <OfflineIndicator />
        </View>
        {/* Logo Position Absolute */}
        <View style={{position: 'absolute', left: '70%', top: '0%'}}>
          <Logo />
        </View>
        {/* Main Screen */}
        <View style={{flexDirection:'row', height:hp('100%')}}>
          {/* Left Main Spacer 1/3 */}
          <View style={{flex: 0.5, backgroundColor:'none'}} />
          {/* Middle Main Part Column 2/3 */}
          <View style={{flex:8}}>
            <View style={{flex: 1, justifyContent:'center', alignItems:'flex-start'}}>
              <Text style={[styles.bcRBB, {fontSize: 50}]}>Welcome</Text>
            </View>
            <KeyboardAvoidingView
              style={{flex:1, alignItems:'flex-start', backgroundColor:'none'}}
              enabled
              behavior="position"
              keyboardVerticalOffset={Platform.OS === 'ios' ? '54' : '0'}>
              <View style={{flex:1, justifyContent:'center'}}>
                <Text style={[styles.h1PSBB, {fontSize: 24}]}>
                  LOGIN/SIGNUP
                </Text>
              </View>
              <View style={{flex:2, justifyContent:'center', backgroundColor:"none"}}>
                <TextInput
                  placeholder="Email-id"
                  placeholderTextColor="#333647"
                  style={[textInput.generalTextInput, {color: '#333647'}]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="done"
                />
                <Text style={{marginTop: hp('1%'), alignSelf: 'center'}}>
                  (We use Passwordless Authentication!)
                </Text>
              </View>
              <View style={{flex:2, justifyContent:'center', backgroundColor:'none'}}>
                <View>
                  <PrimaryButton title="Verify Email" onPress="Username" />
                </View>
                <Text style={{marginTop: hp('1%'), alignSelf: 'center'}}>
                  (Check Your Inbox to go ahead in the app)
                </Text>
              </View>
            </KeyboardAvoidingView>
            <View style={{flex:1, backgroundColor:'none'}} />
          </View>
          {/* Left Main Spacer 1/3 */}
          <View style={{flex: 0.5, backgroundColor:'none'}} />
        </View>
      </View>
    );
  }
}

export default LogInScreen;

/* NOTES 
Setup Forgot paswword or email?
*/

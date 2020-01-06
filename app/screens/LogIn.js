/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
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
                  <PrimaryButton title="Verify Email" onPressPrimaryButton={()=> this.props.navigation.navigate('Username')} />
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

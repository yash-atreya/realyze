/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  KeyboardAvoidingView,
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

class UsernameScreen extends Component {
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
              style={{ alignItems:'flex-start', backgroundColor:'none', justifyContent:'center'}}
              enabled
              behavior="position"
              keyboardVerticalOffset={Platform.OS === 'ios' ? '54' : '0'}>

              <View style={{ justifyContent:'center', backgroundColor:'none'}}>
                <Text style={[styles.h1PSBB, {fontSize: 24}]}>
                  Enter Full Name :
                </Text>
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#333647"
                  style={[textInput.generalTextInput, {color: '#333647'}]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() => this.usernameInput.focus()}
                />
                <Text style={{marginBottom: hp('1%'), alignSelf: 'center'}}>
                  {/* Empty for error message of Full Name Text Input */}(Please fill this blank)
                </Text>
              </View>

              <View style={{ justifyContent:'center', backgroundColor:'none'}}>
                <Text style={[styles.h1PSBB, {fontSize: 24}]}>
                  Enter Username :
                </Text>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#333647"
                  style={[textInput.generalTextInput, {color: '#333647'}]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => (this.usernameInput = input)}
                />
                <Text style={{marginBottom: hp('1.2%'), alignSelf: 'center'}}>
                  {/* Empty for error message of Full Name Text Input */}(Please fill this blank)
                </Text>
              </View>

              <View style={{ justifyContent:'center', backgroundColor:'none'}}>
                <View>
                  <PrimaryButton title="Get Started" onPress="AllTasks" />
                </View>
                <Text style={{marginBottom: hp('1%'), alignSelf: 'center'}}>
                  {/* Error of Get Started */}
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

export default UsernameScreen;

      <View style={{flex: 1, alignItems: 'center', backgroundColor:'#E9EBF1'}}>
        {/* Offline Indicator Position Absolute */}
        <View style={{position:'absolute', alignSelf:'center'}}>
          <OfflineIndicator />
        </View>
        {/* Logo Position Absolute */}
        <View style={{position: 'absolute', left: '70%', top: '0%'}}>
          <Logo />
        </View>

        <Text style={[styles.bcRBB, {fontSize: 50, marginTop: hp('11.78%'), marginBottom:hp('16%')}]}>
          Welcome
        </Text>
        <KeyboardAvoidingView
          enabled
          behavior="position"
          keyboardVerticalOffset="54"
          style={{alignSelf: 'center'}}>
          <Text
            style={[
              styles.h1PSBB,
              {fontSize: 24, alignSelf: 'center'},
            ]}>
            ENTER FULL NAME
          </Text>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#333647"
            style={[
              textInput.generalTextInput,
              {marginTop: hp('2.339%'), color: '#333647'},
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => this.usernameInput.focus()}
          />
          <Text
            style={[
              styles.h1PSBB,
              {fontSize: 24, marginTop: hp('16%'), alignSelf: 'center'},
            ]}>
            ENTER USERNAME
          </Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#333647"
            style={[
              textInput.generalTextInput,
              {marginTop: hp('2.339%'), color: '#333647'},
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="done"
            ref={input => (this.usernameInput = input)}
          />
          <View style={{marginTop: hp('5%')}}>
            <PrimaryButton title="GET STARTED" onPress="AllTasks" />
          </View>
        </KeyboardAvoidingView>
      </View>
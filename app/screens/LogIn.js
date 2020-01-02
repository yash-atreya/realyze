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
        <View style={{position: 'absolute', left: '-20%', top: '5%'}}>
          <Logo />
        </View>
        <View>
          <OfflineIndicator />
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

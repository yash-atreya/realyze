import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import Header2 from '../components/Header2';

class TermsandConditionsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header2 headerTitle="T & C" onPressBackButton="Profile"/>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default TermsandConditionsScreen;
{/* <Button
  title="Go Back to Settings from Terms and Conditions"
  onPress={() => this.props.navigation.navigate('Settings')}
/> */}
{/* <View
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
</View> */}
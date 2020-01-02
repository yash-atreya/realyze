/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import SecondaryHeader from '../components/SecondaryHeader';

class MyBuddiesScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <SecondaryHeader secondaryHeaderTitle="Buddies" />
        <Text>Hello</Text>
      </View>
    );
  }
}

export default MyBuddiesScreen;

{/* <Button
  title="Go Back to Profile"
  onPress={() => this.props.navigation.navigate('Profile')}
  />
  <Text style={{fontFamily: 'Raleway-Bold'}}>My Buddies</Text>
<Icon name="ios-people" color={'#000000'} size={24} /> */}
{/* <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('7.7%'),
  }}>
  <View>
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Profile')}>
      <Icon name="ios-arrow-back" size={34} color={'#000000'} />
    </TouchableOpacity>
  </View>
  <View style={{marginLeft: wp('25%'), alignSelf: 'center'}}>
    <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>
      Buddies
    </Text>
  </View>
</View> */}
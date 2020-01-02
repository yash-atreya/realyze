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
import BuddyHeader from '../components/BuddyHeader';

class StrangerBuddyScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <BuddyHeader buddyUsername="yashatreya.ya" />
        <Text>Hello</Text>
      </View>
    );
  }
}

export default StrangerBuddyScreen;

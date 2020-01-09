/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

class UserProfileNameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onPressTask = this.props.onPressTask;
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'none', alignItems: 'center'}}>
          <View style={[stylesShape.CircleShapeView]} />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.bcRMB, {fontSize: 12, color:'#000000', textAlign:'center',  width:72}]}>yashatreya.yasjkja NAn
          </Text>
        </TouchableOpacity>
  </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    borderWidth: 1,
    borderColor: '#00A1ED',
    shadowRadius: 2,
    backgroundColor: 'transparent',
  },
});

export default withNavigation(UserProfileNameComponent);

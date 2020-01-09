import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles} from '../../styles';

class BuddyAddComponent extends Component {
  constructor(props) {
    super(props);
    this.headerTitle = this.props.headerTitle;
    this.onPressBackButton = this.props.onPressBackButton;
    this.onUserProfilePress = this.props.onUserProfilePress;
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'none',
          overflow: 'hidden',
          marginBottom: 12,
        }}>
        {/* Left Main Spacer, First Part of the main container 1/4*/}
        {/* <View style={{flex: 0.5, backgroundColor: 'pink'}} /> */}

        {/* Profile and Text main container, Second Part of the main container 2/4 */}
        {/* <View style={{flex: 4, flexDirection:'row', backgroundColor: 'purple'}}> */}
        <View
          style={{
            flex: 6,
            flexDirection: 'row',
            backgroundColor: 'none',
            overflow: 'hidden',
          }}>
          {/* a-part- inside Second Main Part Profile Photo */}
          <View style={[stylesShape.CircleShapeView]} />

          {/* b-part-inside Second Main Part*/}
          {/* Middle Spacer between profile photo and text*/}
          <View style={{flex: 0.03, backgroundColor: 'none'}} />

          {/* c-part-inside Second Main Part */}
          {/* Text Part */}
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              // justifyContent:'center',
              backgroundColor: 'none',
            }}>

            {/* Top Spacer in the text box */}
            <View style={{flex: 0.2, backgroundColor: 'none'}} />

            {/* Text Items */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: 'none',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.h1PMB,
                  {fontSize: 16, color: '#000000', textAlign: 'left'},
                ]}>
                dharmi_nk
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.bcRMB,
                  {fontSize: 12, color: '#000000', textAlign: 'left'},
                ]}>
                Dharmi Kumbhani
              </Text>
            </View>

            {/* Bottom Spacer in the text box */}
            <View style={{flex: 0.2, backgroundColor: 'none'}} />
          </View>

          {/* d-part-inside Second Main Part*/}
          {/* Middle Spacer between text and icon*/}
          <View style={{flex: 0.03, backgroundColor: 'none'}} />
        </View>
        {/* </View> */}

        {/* Checkboxex, Third Part of the main container 3/4 */}
        <View
          style={{
            flex: 2,
            // backgroundColor: 'purple',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <MaterialIcon name="add-box" color="#000000" size={40} />
          </TouchableOpacity>
        </View>

        {/* Right Main Spacer 4/4 */}
        {/* <View style={{flex: 0.5, backgroundColor: 'pink'}} /> */}
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    borderWidth: 2,
    // borderColor: '#56575D',
    borderColor: '#00A1ED',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});

export default BuddyAddComponent;

//If Buddy Already Added then
// change <MaterialIcon name="add-box" color="#000000" size={40} />
{/* <Icon name="ios-checkbox" color="#000000" size={40} /> */}
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

class BuddyRequestComponent extends Component {
  constructor(props) {
    super(props);
    this.headerTitle = this.props.headerTitle;
    this.onPressBackButton = this.props.onPressBackButton;
  }

  render() {
    return (
      <View
        style={{
          marginBottom: 12,
          height: 61,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'none',
          overflow: 'hidden',
        }}>
        {/* Left Main Spacer, First Part of the main container 1/4*/}
        <View style={{flex: 0.3, backgroundColor: 'none'}} />

        {/* Profile and Text main container, Second Part of the main container 2/4 */}
        {/* <View style={{flex: 4, flexDirection:'row', backgroundColor: 'purple'}}> */}
        <TouchableOpacity
          // onPress={() => this.props.navigation.navigate(`${this.onPress}`)}
          onPress={() => this.props.navigation.navigate('StrangerBuddy')}
          style={{
            flex: 4,
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
              backgroundColor: 'none',
            }}>
            {/* Top Spacer in the text box */}
            <View style={{flex: 0.2, backgroundColor: 'none'}} />

            {/* Text Items */}
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: 'none',
              }}>
              <Text
                style={[
                  styles.h1PMB,
                  {fontSize: 18, color: '#000000', flex: 1, textAlign: 'left'},
                ]}>
                Yash Atreya
              </Text>
              <Text
                style={[
                  styles.bcRSBB,
                  {fontSize: 14, color: '#000000', flex: 1, textAlign: 'left'},
                ]}>
                @yash0102
              </Text>
            </View>

            {/* Bottom Spacer in the text box */}
            <View style={{flex: 0.2, backgroundColor: 'none'}} />
          </View>

          {/* d-part-inside Second Main Part*/}
          {/* Middle Spacer between profile photo and text*/}
          <View style={{flex: 0.03, backgroundColor: 'none'}} />
        </TouchableOpacity>
        {/* </View> */}

        {/* Checkboxex, Third Part of the main container 3/4 */}
        <View
          style={{
            flex: 1,
            // backgroundColor: 'purple',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <Icon name="ios-checkmark" color="#0DE51E" size={61} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ios-close" color="#FF0000" size={61} />
          </TouchableOpacity>
        </View>

        {/* Right Main Spacer 4/4 */}
        <View style={{flex: 0.3, backgroundColor: 'none'}} />
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 61,
    height: 61,
    borderRadius: 61 / 2,
    borderWidth: 3,
    borderColor:'#56575D',
    // borderColor: '#00A1ED',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});

export default withNavigation(BuddyRequestComponent);

{
  /* <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'pink',
          }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(`${this.onPressBackButton}`)
            }>
            <Icon name="ios-arrow-back" size={34} color={'#000000'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
            // backgroundColor: 'yellow',
          }}>
          <Text
            style={[
              styles.h1PSBB,
              {
                flex: 4.5,
                fontSize: 30,
                color: '#000000',
                alignSelf: 'center',
                overflow: 'visible',
                // backgroundColor: 'green',
              },
            ]}>
            {this.headerTitle}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity>
            <Icon name="ios-close" />
          </TouchableOpacity>
        </View>
      </View> */
}

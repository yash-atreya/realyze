/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

// This is the header component used for primary pages like the main tabs

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.mainHeaderTitle = this.props.mainHeaderTitle;
  }
  render() {
    return (
      // Biggest Parent Container
      <View
        style={{
          height: 45,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: hp('3%'),
          //   backgroundColor: 'blue',
        }}>
        {/* Left Spacer Button 1/3 */}
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'pink',
          }}
        />

        {/* Middle Text Part 2/3 */}
        <View
          style={{
            flex: 10,
            justifyContent: 'center',
            alignItems: 'flex-start',
            overflow: 'visible',
            // backgroundColor: 'yellow',
          }}>
          <Text
            style={[
              styles.h1PSBB,
              {
                fontSize: 30,
                color: '#000000',
                textAlign: 'left',
                overflow: 'visible',
                // backgroundColor: 'green',
              },
            ]}>
            {this.mainHeaderTitle}
          </Text>
        </View>

        {/* Right Spacer 3/3 */}
        <View style={{flex: 0.5}} />
      </View>
    );
  }
}

export default withNavigation(MainHeader);

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

class Header2 extends Component {
  constructor(props) {
    super(props);
    this.headerTitle = this.props.headerTitle;
    this.onPressBackButton = this.props.onPressBackButton;
  }

  render() {
    return (
      <View
        style={{
          height: 45,
          flexDirection: 'row',
          alignItems: 'center',
        //   backgroundColor: 'blue',
        }}>
        <View
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
            flex: 6,
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
        <View style={{flex: 1}} />
      </View>
    );
  }
}

export default withNavigation(Header2);

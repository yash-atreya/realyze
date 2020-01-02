/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
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

class BuddyHeader extends Component {
  constructor(props) {
    super(props);
    this.buddyUsername = this.props.buddyUsername;
    this.onPress = this.props.onPressMoreButton;
  }
  render() {
    return (
      // Biggest Parent Container
      <View
        style={{
            marginBottom: hp('3%'),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'none',
        }}>
        {/* Left Main Tab Spacer 1/5 */}
        <View style={{flex: 0.5, backgroundColor: 'none'}} />

        {/* Icon space 2/5 */}
        <View style={{flex: 1, backgroundColor: 'none', justifyContent:'center', alignItems:'flex-start'}} >
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.goBack()
                }>
                <Icon name="ios-arrow-back" size={34} color={'#000000'} />
            </TouchableOpacity>
        </View>

        {/* Text space 3/5 */}
        {/* The Children inside this tag given flex default of column therefore justifycontent and align items works in similar fashion of column layout design  */}
        <View style={{flex: 6, backgroundColor: 'none', justifyContent:'center', alignItems:'center'}}>
          <Text style={[styles.h1PMB, {fontSize: 20, color: '#000000', textAlign:'center'}]}>{this.buddyUsername}</Text>
        </View>
        
        {/* Next Icon space 4/5 */}
        <View style={{flex: 1, backgroundColor: 'none', justifyContent:'center',  alignItems:'flex-end'}}>
            <TouchableOpacity onPress={this.onPressMoreButton}>
                <Icon name="ios-more" size={24} color={'#000000'} />
            </TouchableOpacity>
        </View>

        {/* Right Main Tab Spacer 5/5 */}
        <View style={{flex: 0.5, backgroundColor: 'none'}} />
      </View>
    );
  }
}

export default withNavigation(BuddyHeader);

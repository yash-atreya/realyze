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
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles} from '../../styles';

class IconTabComponent extends Component {
  constructor(props) {
    super(props);
    this.tabTitle = this.props.tabTitle;
    // this.onPress = this.props.onPress;
    this.onPress = this.props.onPress;
    this.Icon = this.props.Icon;
  }
  render() {
    return (
// Here the entire tab has touchable opacity

      // Biggest Parent Container
      <TouchableOpacity
        //   This commented component wont work because if i want to activate a modal then it can cause issue
        // onPress={() => this.props.navigation.navigate(`${this.onPressNextButton}`)}
        onPress={this.onPress}
        style={{
          marginBottom: 24,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'none',
          overflow: 'hidden',
        }}>
        {/* Left Main Tab Spacer 1/5 */}
        <View style={{flex: 0.6, backgroundColor: 'none'}} />
        {/* Icon space 2/5 */}
        <View style={{flex: 1, backgroundColor: 'none', justifyContent:'center', alignItems:'flex-start'}}>
          {this.Icon}
        </View>
        {/* Text space 3/5 */}
        {/* The Children inside this tag given flex default of column therefore justifycontent and align items works in similar fashion of column layout design  */}
        <View style={{flex: 6, backgroundColor: 'none', justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={[styles.h1PMB, {fontSize: 20, color: '#000000',}]}>{this.tabTitle}</Text>
        </View>
        {/* Next Icon space 4/5 */}
        <View style={{flex: 1, backgroundColor: 'none', justifyContent:'center',  alignItems:'flex-end'}}>
          <Icon name="ios-arrow-forward" size={24} color={'#000000'} />

        </View>
        {/* Right Main Tab Spacer 5/5 */}
        <View style={{flex: 0.6, backgroundColor: 'none'}} />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(IconTabComponent);

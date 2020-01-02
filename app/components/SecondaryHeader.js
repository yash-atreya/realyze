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

// This is the header component used for secondary pages

class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.secondaryHeaderTitle = this.props.secondaryHeaderTitle;
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
          <Text style={[styles.h1PSBB,, {fontSize: 30, color: '#000000', textAlign:'center'}]}>{this.secondaryHeaderTitle}</Text>
        </View>

        {/* Right Main Tab Spacer 4/4 */}
        {/* Here given flex of 1.5 to equate it with the 0.5(left main Spacer) and 1 for the back button icon */}
        <View style={{flex: 1.5, backgroundColor: 'none'}} />
      </View>
    );
  }
}

export default withNavigation(SecondaryHeader);


// // Biggest Parent Container
// <View
// style={{
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginBottom: hp('3%'),
//   backgroundColor: 'blue',
// }}>
// {/* Back Button 1/3 */}
// <View
//   style={{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'pink',
//   }}>
//   <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//     <Icon name="ios-arrow-back" size={34} color={'#000000'} />
//   </TouchableOpacity>
// </View>

// {/* Middle Text Part 2/3 */}
// <View
//   style={{
//     flex: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'visible',
//     // backgroundColor: 'yellow',
//   }}>
//   <Text
//     style={[
//       styles.h1PSBB,
//       {
//         flex: 4.5,
//         fontSize: 30,
//         color: '#000000',
//         textAlign: 'center',
//         alignSelf: 'center',
//         overflow: 'visible',
//         // backgroundColor: 'green',
//       },
//     ]}>
//     {this.secondaryHeaderTitle}
//   </Text>
// </View>

// {/* Right Spacer 3/3 */}
// <View style={{flex: 1}} />
// </View>
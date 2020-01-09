/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

//Custom External StyleSheet
// import {styles, textInput,} from '../../styles';
import {styles} from '../../styles';

class PrimaryButton extends React.Component {
  constructor(props) {
    super(props);
    this.title = this.props.title;
    // this.code = this.props.navigation.getParam('code');
    this.onPressPrimaryButton = this.props.onPressPrimaryButton;
  }
  render() {
    return (
      // <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center', marginBottom: hp('1%'),}}>
      //   <View style={{flex: 0.5}} />
      // <View style={{flex: 8}}>
      <TouchableOpacity
        // onPress={() => this.props.navigation.navigate(`${this.onPress}`)}
        onPress={this.onPressPrimaryButton}
        style={{
          shadowColor: '#102FC6',
          shadowOpacity: 0.3,
          shadowOffset: {width: 0, height: 7},
          shadowRadius: 11,
          // width: wp('88.8%'),
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00A1ED', '#0A3BC6']}
          style={[buttonStyles.buttonBody]}>
          {/* {this.code === 1 ? (
            <Text style={[styles.h1PBW, {fontSize: 20}]}>{this.title}</Text>
          ) : (
            <Text style={[styles.h1PBW, {fontSize: 24}]}>{this.title}</Text>
          )} */}
          <Text style={[styles.h1PBW, {fontSize: 22}]}>{this.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
      //   </View>
      //   <View style={{flex: 0.5}} />
      // </View>
    );
  }
}
const buttonStyles = StyleSheet.create({
  buttonBody: {
    width: wp('88.8'),
    // height: hp('5.9%'),
    height: 48,
    borderRadius: Platform.OS === 'ios' ? 11 : 3,
    shadowColor: '#102FC6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrimaryButton;

import React, {StyleSheet,Platform} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//while exporting default you can only export one thing
//export default StyleSheet.create({
const styles = StyleSheet.create({
  h1PBW: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFF',
  },
  h1PSBW: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFF',
  },
  h1PRW: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFF',
  },
  bcRMW: {
    fontFamily: 'Raleway-Medium',
    color: '#FFFF',
  },
  bcRBW: {
    fontFamily: 'Raleway-Bold',
    color: '#FFFF',
  },
  bcRLW: {
    fontFamily: 'Raleway-Light',
    color: '#FFFF',
  },
  bcRLiW: {
    fontFamily: 'Poppins-LightItalic',
    color: '#FFFF',
  },
  bc2RELiW: {
    fontFamily: 'Poppins-LightItalic',
    color: '#FFFF',
  },
  h1PBB: {
    fontFamily: 'Poppins-Bold',
    color: '#333647',
  },
  h1PRB: {
    fontFamily: 'Poppins-Regular',
    color: '#333647',
  },
  bcRMB: {
    fontFamily: 'Raleway-Medium',
    color: '#333647',
  },
  bcRBB: {
    fontFamily: 'Raleway-Bold',
    color: '#333647',
  },
  bcRLB: {
    fontFamily: 'Raleway-Light',
    color: '#333647',
  },
  bcRLiB: {
    fontFamily: 'Poppins-LightItalic',
    color: '#333647',
  },
  bc2RELiB: {
    fontFamily: 'Poppins-LightItalic',
    color: '#333647',
  },
  h1PSBB: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333647',
  },
});
const textInput = StyleSheet.create({
  generalTextInput: {
    // width: wp('84.26'),
    // height: Platform.OS === 'ios' ? hp('4.92') : hp('6'),
    width: 316,
    height: 40,
    borderColor: '#00A1EDC4',
    borderWidth: 1,
    fontFamily: 'Raleway-Medium',
    fontSize: 15,
    borderRadius: Platform.OS === 'ios' ? 11 : 3,
    paddingLeft: wp('1.6'),
    //paddingBottom: hp('1.6%'),
    //paddingBottom: hp('1.47%'),
  },
});
const buttonStyles = StyleSheet.create({
  buttonBody: {
    // width: wp('84.26'),
    // height: hp('5.9%'),
    width: 316,
    height: 48,
    borderRadius: Platform.OS === 'ios' ? 11 : 3,
    shadowColor: '#102FC6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export {styles, textInput, buttonStyles};
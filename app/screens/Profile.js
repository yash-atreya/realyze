/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';

//Custom Components
import {styles, textInput, buttonStyles} from '../../styles';
import PrimaryButton from '../components/PrimaryButton';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal, {
  SlideAnimation,
  BottomModal,
  ModalContent,
} from 'react-native-modals';
import LinearGradient from 'react-native-linear-gradient';

//Cutom Screens

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    text: '',
  };
  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

  render() {
    return (
      <View>
        {/* Main Screen Header */}
        <View>
          <View
            style={{
              marginBottom: hp('2%'),
              marginTop: hp('0.7%'),
              marginLeft: wp('5.6%'),
            }}>
            <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>
              Profile
            </Text>
          </View>
        </View>
        {/* Main Screen Body */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: hp('4.6%'),
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Icon name="ios-settings" size={30} />
          </TouchableOpacity>
          <View style={stylesShape.CircleShapeView} />
          <TouchableOpacity onPress={this.toggleModal}>
            <FontAwesome5 name="edit" size={26} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginTop: hp('4.6%'),
            marginLeft: wp('8.5%'),
          }}>
          <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000'}]}>
            @USERNAME
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyBuddies')}
            style={{flexDirection: 'row', marginTop: hp('1.8%')}}>
            <Text style={[styles.bcRMB, {fontSize: 16, color: '#000000'}]}>
              BUDDIES
            </Text>
            <Text
              style={[
                styles.bcRMB,
                {fontSize: 16, color: '#000000', marginLeft: wp('4.8%')},
              ]}>
              155
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.bcRRB,
              {
                fontSize: 12,
                color: '#000000',
                marginTop: hp('1.8%'),
                marginRight: wp('13.5%'),
                textAlign: 'left',
              },
            ]}>
            This is where the bio will be held and shown to everyone lorem ipsum
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </Text>
          <View style={{marginTop: hp('2%')}}>
            <PrimaryButton title="VIEW INSIGHTS" onPress="ViewInsights" />
          </View>
        </View>

        {/* Edit Profile Modal */}
        <BottomModal
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({visible: false});
          }}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {
            this.setState({visible: false});
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('91.2%')}
          modalStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#B5BBC6',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
          {/* <ModalContent> */}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, marginLeft: wp('6.13%')}}>
              <View>
                <Text
                  style={[
                    styles.h1PSBB,
                    {fontSize: 30, color: '#000000', marginTop: hp('2%')},
                  ]}>
                  EDIT PROFILE
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Platform.OS === 'ios' ? hp('2%') : hp('1%'),
                }}>
                <View style={stylesShape.CircleShapeView2} />
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.bcRBB,
                      {fontSize: 12, color: '#000000', marginLeft: wp('5.3%')},
                    ]}>
                    Change Profile Photo
                  </Text>
                </TouchableOpacity>
              </View>
              <KeyboardAvoidingView>
                <Text
                  style={[
                    styles.bcRBB,
                    {
                      fontSize: 15,
                      marginTop: Platform.OS === 'ios' ? hp('2.3%') : hp('1.5%'),
                      color: '#000000',
                    },
                  ]}>
                  USERNAME:
                </Text>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#333647"
                  style={[
                    textInput.generalTextInput,
                    {
                      marginTop: hp('0.86%'),
                      color: '#333647',
                      backgroundColor: '#FFFFFF',
                      width: wp('87%'),
                    },
                  ]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  onSubmitEditing={() => this.bioInput.focus()}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView>
                <Text
                  style={[
                    styles.bcRBB,
                    {fontSize: 15, marginTop: hp('2.3%'), color: '#000000'},
                  ]}>
                  BIO:
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={2}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder="Bio"
                  maxLength={250}
                  placeholderTextColor="#333647"
                  style={[
                    textInput.generalTextInput,
                    {
                      marginTop: hp('0.86%'),
                      color: '#333647',
                      backgroundColor: '#FFFFFF',
                      width: wp('87%'),
                      height: hp('16.25%'),
                      textAlignVertical: 'top',
                    },
                  ]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => (this.bioInput = input)}
                />
              </KeyboardAvoidingView>
              {/* {console.log(this.state.text)} */}
              <TouchableOpacity
                onPress={() => this.passData()}
                style={{
                  shadowColor: '#102FC6',
                  shadowOpacity: 0.3,
                  shadowOffset: {width: 0, height: 7},
                  shadowRadius: 11,
                  marginTop: Platform.OS === 'ios' ? hp('20%') : hp('20%'),
                  marginRight: 0,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#00A1ED', '#0A3BC6']}
                  style={[
                    buttonStyles.buttonBody,
                    {
                      width: wp('87%'),
                      // marginTop: hp('31.5%'),
                    },
                  ]}>
                  <Text style={[styles.h1PBW, {fontSize: 24}]}>SAVE</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </BottomModal>
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 228,
    height: 228,
    borderRadius: 228 / 2,
    borderWidth: 5,
    borderColor: '#00A1ED',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
  CircleShapeView2: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    borderWidth: 4,
    borderColor: '#00A1ED',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});

export default ProfileScreen;

{
  /* <Button
title="Settings"
onPress={() => this.props.navigation.navigate('Settings')}
/>
<Button title="Edit Profile" onPress={this.toggleModal} /> */
}
{
  /* <Button
          title="My Buddies"
          onPress={() => this.props.navigation.navigate('MyBuddies')}
        /> */
}
{
  /* <Button
          title="View Insights"
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        /> */
}
{
  /* <ModalContent> */
}

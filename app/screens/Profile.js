/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Share,
  Platform,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import RNPermissions, {RESULTS} from 'react-native-permissions';
import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';
import {
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import IconTabComponent from '../components/IconTabComponent';
import MainHeader from '../components/MainHeader';

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
    console.log('PROFILE SCREEN');
    console.log(auth().currentUser);

    this.state = {
      image: {
        uri: null, //' '
        width: null,
        height: null,
        mime: null,
      },
    };
  }

  componentDidMount() {
    this.checkPermission().then(() => this.requestPermission());
  }
  async checkPermission() {
    if (Platform.OS === 'android') {
      RNPermissions.check(
        RNPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      )
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          // …
        });
      RNPermissions.check(
        RNPermissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      )
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          // …
        });
      RNPermissions.check(RNPermissions.PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          // …
        });
    } else if (Platform.OS === 'ios') {
      RNPermissions.check(RNPermissions.PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          // …
        });
    }
  }

  async requestPermission() {
    if (Platform.OS === 'android') {
      await RNPermissions.request(
        RNPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      await RNPermissions.request(
        RNPermissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      );
      await RNPermissions.request(RNPermissions.PERMISSIONS.ANDROID.CAMERA);
    } else if (Platform.OS === 'ios') {
      RNPermissions.request(RNPermissions.PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
  }
  renderImage(image) {
    return (
      <ScrollView>
        <Image
          style={{
            width: 228,
            height: 228,
            borderRadius: 114,
            resizeMode: 'contain',
          }}
          source={image || {uri: 'https://unsplash.com/photos/BuQ-jgeexaQ'}}
        />
        <Image
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            resizeMode: 'contain',
          }}
          source={image || {uri: 'https://unsplash.com/photos/BuQ-jgeexaQ'}}
        />
      </ScrollView>
    );
  }

  async uploadImage(filePath) {
    this.setState({loading: true});
    const uid = auth().currentUser.uid;
    const username = auth().currentUser.displayName;
    const metaData = {
      username: `${username}`,
      uid: `${uid}`,
    };
    await storage()
      .ref(`ProfilePictures/${uid}`)
      .putFile(filePath);
    console.log('Uploaded...');
    this.setState({loading: false});
  }

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openPicker({
      cropping: cropping,
      width: 228,
      height: 228,
      includeExif: true,
      mediaType,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log('received image', image);
        console.log('image path: ', image.path);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .then(async () => {
        console.log('Uploading...');
        this.uploadImage(this.state.image.uri);
      })
      .catch(e => alert(e));
  }
  onDeleteAccount() {
    this.props.navigation.navigate('ReAuth', {code: 1});
  }
  onChangePassword() {
    this.props.navigation.navigate('ReAuth', {code: 3});
  }

  onShareProfile() {
    dynamicLinks()
      .buildLink({
        link: 'https://realyze-07.firebaseapp.com',
        domainUriPrefix: 'https://realyze.page.link',
      })
      .then(link => {
        Share.share({
          message: `Follow this link: ${link}`,
        });
      });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollView>
          <Text>Profile Screen</Text>
          <View>
            {this.state.image ? this.renderImage(this.state.image) : null}
          </View>
          <Button
            title="Pick Image"
            onPress={() => this.pickSingleWithCamera(true)}
          />
          <Button
            title="Delete Account"
            onPress={() => this.onDeleteAccount()}
          />
          <Button
            title="Edit Profile"
            onPress={() => this.props.navigation.navigate('EditProfile')}
          />
          <Button
            title="Change Password"
            onPress={() => this.onChangePassword()}
          />
          <Button
            title="Downloaded Profile"
            onPress={() => this.props.navigation.navigate('ProfileDownload')}
          />
          <Button title="Share" onPress={() => this.onShareProfile()} />
        </ScrollView>
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
        <MainHeader mainHeaderTitle="Profile" />
        
        {/* Main Screen Body */}

        {/* Setting ProfilePicture and Edit Profile */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: hp('1.6%')
          }}>
          {/* Settings Icon 1/3 */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Icon name="ios-settings" size={30} />
          </TouchableOpacity>
          {/* ProfilePicture Icon 2/3 */}
          <View style={[stylesShape.CircleShapeView]} />

          {/* EditProfile Icon 3/3 */}
          <TouchableOpacity onPress={this.toggleModal}>
            <FontAwesome5 name="edit" size={26} />
          </TouchableOpacity>
        </View>

        {/* Full name, Username, Buddies, Bio */}
        <View style={{flexDirection: 'row', backgroundColor:'none', marginBottom: hp('1%')}}>
          {/* Left Spacer 1/3 */}
          <View style={{flex: 0.5, backgroundColor: 'none'}} />

          {/* Middle Text Part 2/3 */}
          <View style={{flex:8, backgroundColor:'none'}}>
            {/* The color of this View component will only be seen if it is given a specific height */}
            {/* The Full name cell 1/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('2%')}}>
              <Text style={[styles.h1PMB, {fontSize: 20, color: '#000000', textAlign:'center',}]}>Tanay Jain</Text>
            </View>
            {/* Username cell name 2/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%')}}>
              <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]}>@tanay14.jain</Text>
            </View>
            {/* Buddies and no of Buddies 3/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%'), alignItems:'flex-start'}}>
              {/* If aligning items is left to default (i.e nothing) then it causes the entire cell to be touchable opacity therefor we use flex-start to limit the react of the components */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MyBuddies')} style={{flexDirection: 'row'}}>
                <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]} >BUDDIES     </Text>
                <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]}>0</Text>
              </TouchableOpacity>
            </View>
            {/* Bio cell 4/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%')}}>
              <Text style={[styles.bcRRB, {fontSize: 14, color: '#000000', textAlign:'left'}]}>Not yet updated the Bio</Text>
            </View>
          </View>

          {/* Right Spacer 3/3 */}
          <View style={{flex: 0.5, backgroundColor: 'none'}} />
        </View>

        <IconTabComponent
          tabTitle="View Insights"
          Icon={<Icon name="ios-stats" size={24} color={'#000000'} />}
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        />

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
                      marginTop:
                        Platform.OS === 'ios' ? hp('2.3%') : hp('1.5%'),
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
    // borderColor: '#00A1ED',
    borderColor: '#56575D',
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
{/* <View
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
        </View> */}
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

//Custom Components
import {styles, textInput, buttonStyles} from '../../styles';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal, {
  SlideAnimation,
  BottomModal,
  ModalContent,
} from 'react-native-modals';

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

        {/* Main Screen */}
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
        <Button
          title="View Insights"
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        />
        <Button
          title="My Buddies"
          onPress={() => this.props.navigation.navigate('MyBuddies')}
        />
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button title="Edit Profile" onPress={this.toggleModal} />

        {/* Edit Profile Modal */}
        <BottomModal
          visible={this.state.visible}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {
            this.setState({visible: false});
          }}
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('91.2%')}
          modalStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#D5D7DB',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}
          onTouchOutside={() => {
            this.setState({visible: false});
          }}>
          <View>
            <Text>Edit Profile Modal</Text>
            <Button
              title="Save"
              onPress={() => {
                this.setState({visible: false});
              }}
            />
          </View>
        </BottomModal>
      </View>
    );
  }
}

export default ProfileScreen;

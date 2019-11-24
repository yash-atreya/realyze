import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    console.log('PROFILE SCREEN');
    console.log(auth().currentUser);
  }
  onDeleteAccount() {
    this.props.navigation.navigate('ReAuth', {code: 1});
  }
  onChangePassword() {
    this.props.navigation.navigate('ReAuth', {code: 3});
  }

  editProfile() {
    const uid = auth().currentUser.uid;
    // auth().currentUser.updateProfile({
    //changing user metadata here
    // })
    // firestore().collection('Users').doc(`${uid}`).update({
    //   username: null,
    //   email: null,
    //   profilePic: null,
    //   bio: null,
    // });
    // Edit profile pic using firebase storage.
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Profile Screen</Text>
        <Button title="Delete Account" onPress={() => this.onDeleteAccount()} />
        <Button
          title="Edit Profile"
          onPress={() => this.props.navigation.navigate('EditProfile')}
        />
        <Button
          title="Change Password"
          onPress={() => this.onChangePassword()}
        />
      </View>
    );
  }
}

export default ProfileScreen;

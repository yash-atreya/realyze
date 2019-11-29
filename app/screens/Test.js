import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import RNPermissions, {RESULTS} from 'react-native-permissions';

class TestScreen extends Component {
  constructor(props) {
    super(props);
  }

  async requestAll() {
    try {
      if (Platform.OS === 'android') {
        const microphoneANDROID = await RNPermissions.request(
          RNPermissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
        );
      } else if (Platform.OS === 'ios') {
        const microphoneIOS = await RNPermissions.request(
          RNPermissions.PERMISSIONS.IOS.MICROPHONE,
        );
      }
    } catch {
      console.log('err requesting permissions');
    }
  }

  async checkPerms() {
    if (Platform.OS === 'ios') {
      try {
        await RNPermissions.check(RNPermissions.PERMISSIONS.IOS.MICROPHONE)
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
          .catch(() => console.log('err'));
      } catch {
        console.log('ios error');
      }
    } else if (Platform.OS === 'android') {
      try {
        await RNPermissions.check(
          RNPermissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
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
          .catch(() => console.log('err'));
      } catch {
        console.log('android error');
      }
    }
  }

  render() {
    return (
      <View>
        <Button
          title="Request Permissions"
          onPress={() => this.requestAll().then('Permissions requested')}
        />
        <Button title="Check Permissions" onPress={() => this.checkPerms()} />
      </View>
    );
  }
}

export default TestScreen;

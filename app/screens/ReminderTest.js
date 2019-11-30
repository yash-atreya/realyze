import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNPermissions, {RESULTS} from 'react-native-permissions';

const audioRecorderPlayer = new AudioRecorderPlayer();

class ReminderTestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      microphonePermIOS: false,
      microphonePermANDROID: false,
      readStoragePermANDROID: false,
      writeStoragePermANDROID: false,
    };
  }

  componentDidMount() {
    this.checkPerms().then(() => {
      this.requestPerm();
    });
  }

  // ===================================CHECK PERMISSIONS=====================================================================
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
                this.setState({microphonePermIOS: true});
                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
            }
          })
          .then(() => this.setState({microphonePermIOS: true}))
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
                this.setState({microphonePermANDROID: true});
                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
            }
          })
          .catch(() => console.log('err'));
        await RNPermissions.check(
          RNPermissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ).then(result => {
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
              this.setState({writeStoragePermANDROID: true});
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        });
        await RNPermissions.check(
          RNPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ).then(result => {
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
              this.setState({readStoragePermANDROID: true});
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        });
      } catch {
        console.log('android error');
      }
    }
  }

  //===================================REQUEST PERMISSIONS==========================================
  async requestPerm() {
    if (Platform.OS === 'ios') {
      try {
        if (this.state.microphonePermIOS === false) {
          await RNPermissions.request(RNPermissions.PERMISSIONS.IOS.MICROPHONE);
        }
      } catch {
        console.log('err requesting ios perms');
      }
    } else if (Platform.OS === 'android') {
      if (this.state.microphonePermANDROID === false) {
        await RNPermissions.request(
          RNPermissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
        );
      }

      if (this.state.readStoragePermANDROID === false) {
        await RNPermissions.request(
          RNPermissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
      }

      if (this.state.writeStoragePermANDROID === false) {
        await RNPermissions.request(
          RNPermissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );
      }
    }
  }

  //================================RN-AUDIO-RECORDER-PLAYER====================================

  path = Platform.select({
    ios: 'hello.m4a',
    android: 'sdcard/hello.mp4', // should give extra dir name in android. Won't grant permission to the first level of dir.
  });
  async onStartRecord() {
    const result = await audioRecorderPlayer.startRecorder(this.path);
    console.log('startRecord: ', result);
  }

  async onStopRecord() {
    const result = await audioRecorderPlayer.stopRecorder();
    console.log('stopRecorder', result);
  }

  async onPlay() {
    const result = await audioRecorderPlayer.startPlayer(this.path);
    console.log('startPlayer', result);
  }

  async onStop() {
    const result = audioRecorderPlayer.stopPlayer();
    console.log('player stopped', result);
  }

  render() {
    return (
      <View>
        <Button title="Record" onPress={() => this.onStartRecord()} />
        <Button title="Stop Recording" onPress={() => this.onStopRecord()} />
        <Button title="Play" onPress={() => this.onPlay()} />
        <Button title="Stop Play" onPress={() => this.onStop()} />
      </View>
    );
  }
}

export default ReminderTestScreen;

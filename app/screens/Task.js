/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import { Button, View, TextInput, Text, Platform, FlatList, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllTasksComp from '../components/AllTasksComp';
import functions from '@react-native-firebase/functions';
import RNPermissions, {RESULTS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';


//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal, {BottomModal, SlideAnimation} from 'react-native-modals';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import SecondaryHeader from '../components/SecondaryHeader';
import AllTasksComponent from '../components/AllTasksComponent';
import BuddyHeader from '../components/BuddyHeader';
import UserProfileName from '../components/UserProfileNameComponent';
import ReminderVoicemail from '../components/ReminderVoicemailComponent';
import { ScrollView } from 'react-native-gesture-handler';

var Sound = require('react-native-sound');
const audioRecorderPlayer = new AudioRecorderPlayer();

class TaskScreen extends Component {
  constructor(props) {
    super(props);
    this.taskId = this.props.navigation.getParam('taskId');
    console.log(this.taskId);
    //Retrieving author uid
    this.state = {
      title: '',
      logText: '',
      authorUid: '',
      taskAuthor: '',
      microphonePermIOS: false,
      microphonePermANDROID: false,
      readStoragePermANDROID: false,
      writeStoragePermANDROID: false,
      recordSecs: 0,
      recordTime: 0,
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: 0,
      duration: 0,
      file: '',
      downloadLocation: '',
    };

    this.tempLogs = [];
  }

  componentDidMount() {
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .get()
      .then(doc => {
        console.log(doc.data());
        this.setState({
          title: doc.data().title,
          authorUid: doc.data().uid,
          taskAuthor: doc.data().author,
        });
      })
      .then(() => {
        this.fetchLogs();
      })
      .then(() => {
        const uid = auth().currentUser.uid;
        if (this.state.authorUid !== uid) {
          this.checkPerms().then(() => {
            this.requestPerm();
          });
        }
      })
      .catch(err => console.log('Error, unable to load task data', err));
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
                  'The microphone permission has not been requested / is denied but requestable',
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
        // if (this.state.microphonePermIOS === false) {
        await RNPermissions.request(RNPermissions.PERMISSIONS.IOS.MICROPHONE);
        // }
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
    android: 'sdcard/hello.mp3', // should give extra dir name in android. Won't grant permission to the first level of dir.
  });
  async onStartRecord() {
    const result = await audioRecorderPlayer.startRecorder(this.path);
    console.log('startRecord: ', result);
    audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
    });
    this.setState({
      file: result,
    });
    console.log('STATE FILE: ', this.state.file);
    return;
  }

  async onStopRecord() {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log('stopRecorder', result);
  }

  async onPlay() {
    try {
      const result = await audioRecorderPlayer.startPlayer(this.path);
      console.log('startPlayer', result);
      audioRecorderPlayer.addPlayBackListener(e => {
        if (e.current_position === e.duration) {
          console.log('finished');
          this.onStop();
        }
        this.setState({
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
        return;
      });
    } catch {
      console.log('ERR onPlay()');
    }
  }

  async onStop() {
    const result = audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    this.setState({
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: 0,
      duration: 0,
    });
    console.log('player stopped', result);
  }

  //======================================FIREBASE STORAGE=====================================================

  storageRef = storage().ref();
  helloAudioMessagesRef = this.storageRef.child('AudioMessages/hello.m4a');
  //UPLOAD
  onUpload = async () => {
    var uploadFile = this.state.file;
    console.log('uploadFile', uploadFile);
    this.helloAudioMessagesRef.putFile(uploadFile).then(function(snapshot) {
      console.log('Uploaded a file!');
    });

    return;
  };
  //DOWNLOAD
  onDownload() {
    if (Platform.OS === 'android') {
      var downloadTo = `${
        firebase.utils.FilePath.DOCUMENT_DIRECTORY
      }/Realyze/AudioMessages_sent/hello.mp3`;

      this.setState({downloadLocation: downloadTo});
      const task = this.helloAudioMessagesRef
        .writeToFile(downloadTo)
        .then(() => {
          console.log('Downloaded!');
        });
      var url = this.helloAudioMessagesRef
        .getDownloadURL()
        .then(url => console.log('DOWNLOAD URL', url));
      console.log('DOWNLOAD TO: ', downloadTo);
    } else if (Platform.OS === 'ios') {
      var downloadTo = `file:///private${
        firebase.utils.FilePath.DOCUMENT_DIRECTORY
      }/Realyze/helloDownloaded.m4a`;
      this.setState({downloadLocation: downloadTo});
      const task = this.helloAudioMessagesRef
        .writeToFile(downloadTo)
        .then(() => {
          console.log('Downloaded!');
        });
      var url = this.helloAudioMessagesRef
        .getDownloadURL()
        .then(url => console.log('DOWNLOAD URL', url));
      console.log('DOWNLOAD TO: ', downloadTo);
    }
  }

  async playDownloaded() {
    // try {
    //   console.log('DOWNLOAD LOCATION: ', this.state.downloadLocation);
    //   const result = await audioRecorderPlayer.startPlayer(
    //     this.state.downloadLocation,
    //   );
    //   console.log('playDownloaded: ', result);
    //   audioRecorderPlayer.addPlayBackListener(e => {
    //     if (e.current_position === e.duration) {
    //       console.log('finished');
    //       this.onStop();
    //     }
    //     this.setState({
    //       currentPositionSec: e.current_position,
    //       currentDurationSec: e.duration,
    //       playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
    //       duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
    //     });
    //     return;
    //   });
    // } catch {
    //   console.log('ERR onPlay()');
    // }

    Sound.setCategory('Playback');

    var hello = new Sound(this.state.downloadLocation, undefined, error => {
      console.log('DOWNLOAD LOCATION: ', this.state.downloadLocation);
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          hello.getDuration() +
          'number of channels: ' +
          hello.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      hello.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  }
  //======================================TASK METHODS==========================================

  deleteTask() {
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .delete()
      .then(() => console.log('task deleted'));
  }
  fetchLogs() {
    firestore()
      .collection('Logs')
      .where('taskId', '==', `${this.taskId}`)
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log(snap.data());
          this.tempLogs.push({
            logText: snap.data().logText,
            timestamp: snap.data().timestamp,
            author: snap.data().author,
          });
        });
      })
      .then(() => {
        console.log('tempLogs: ', JSON.stringify(this.tempLogs, null, 2));
        this.setState({logs: this.tempLogs});
      });
  }
  createLog() {
    const {logText} = this.state;
    const username = auth().currentUser.displayName;
    if (logText === '') {
      console.log('Type something to log it');
      // Add UX to indicate user that nothing has been typed
    } else {
      this.tempLogs.push({
        logText: logText,
        timestamp: new Date(),
        author: username,
      });
      this.setState({logs: this.tempLogs, logText: ''});
      firestore()
        .collection('Logs')
        .doc()
        .set({
          taskId: this.taskId,
          logText: logText,
          timestamp: new Date(),
          author: username,
        })
        .then(console.log('LOGGED'))
        .catch(err => console.log('Error: unable to log ', err));
    }
  }

  onMarkCompleted() {
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .update({
        status: 'completed',
      })
      .then(() => console.log('Task completed'))
      .then(() => this.notifyTaskCompletion())
      .catch(err => console.log('err updating task status', err));
  }

  //CLOUD FUNCTION
  notifyTaskCompletion() {
    //Add setTimeout for a possible scenario of checking the task by mistake. And add if else.
    const uid = auth().currentUser.uid;
    functions()
      .httpsCallable('notifyTaskCompleted')({
        taskId: this.taskId,
        taskTitle: this.state.title,
        author: this.state.taskAuthor,
      })
      .then(() => console.log('notifiedTaskCompletion'))
      .catch(err => console.log('notifying error: ', err));
  }

  unmarkCompletion() {
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .update({
        status: 'pending',
      })
      .then(() => console.log('Task unmarked'))
      .then(() => this.notifyUnmarkedTask())
      .catch(err => console.log('err unmarking', err));
  }

  //CLOUD FUNCTION
  notifyUnmarkedTask() {
    functions().httpsCallable('notifyUnmarkedTask')({
      taskId: this.taskId,
      taskTitle: this.state.title,
      author: this.state.taskAuthor,
    });
  }

  deleteLogs() {
    firestore()
      .collection('Logs')
      .where('taskId', '==', `${this.taskId}`)
      .get()
      .then(doc => {
        doc.forEach(snap => {
          if (snap.exists) {
            console.log('deleting logs from : ', snap.exists);
            firestore()
              .collection('Logs')
              .doc(`${snap.id}`)
              .delete(); // Need to be online for this
          } else {
            null;
          }
        });
      })
      .catch(err => console.log('err deleting log', err));
  }
  deleteReminders() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Reminders')
      .where('to', '==', `${uid}`)
      .get()
      .then(doc => {
        doc.forEach(snap => {
          if (snap.exists) {
            firestore()
              .collection('Reminders')
              .doc(`${snap.id}`)
              .delete();
          } else {
            null;
          }
        });
      });
  }
  onNudge() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Reminders')
      .doc()
      .set({
        taskId: this.taskId,
        to: this.authorUid,
        from: uid,
        nudge: true,
        voice: null,
      });
  }

  _renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.logText}</Text>
        {/* <Text>{item.timestamp}</Text> */}
      </View>
    );
  };

  render() {
    const uid = auth().currentUser.uid;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {uid === this.state.authorUid ? (
          <View>
            <AllTasksComp title={this.state.title} />
            {/* <FlatList
              data={this.state.logs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this._renderItem}
            /> */}
            <TextInput
              placeholder="log"
              onChangeText={logText => {
                this.setState({logText: logText});
              }}
              style={{
                height: 40,
                width: 100,
                borderColor: 'gray',
                borderWidth: 1,
              }}
            />
            <Button title="LogIt" onPress={() => this.createLog()} />
            <Button
              title="Edit Task"
              onPress={() =>
                this.props.navigation.navigate('EditTask', {
                  taskId: this.taskId,
                  author: this.state.taskAuthor,
                })
              }
            />
            <Button title="Complete" onPress={() => this.onMarkCompleted()} />
            <Button
              title="Incomplete"
              onPress={() => this.unmarkCompletion()}
            />
            <Button title="Delete" onPress={() => this.deleteTask()} />
          </View>
        ) : (
          <View>
            <AllTasksComp title={this.state.title} />
            <Button title="Nudge" onPress={() => this.onNudge()} />
            <Button title="Record" onPress={() => this.onStartRecord()} />
            <Text>{this.state.recordTime}</Text>
            <Button title="Stop Record" onPress={() => this.onStopRecord()} />
            <Button title="Play" onPress={() => this.onPlay()} />
            <Text>{this.state.playTime}</Text>
            <Button title="Upload" onPress={() => this.onUpload()} />
            <Button title="Download" onPress={() => this.onDownload()} />
            <Button
              title="Play Downloaded File"
              onPress={() => this.playDownloaded()}
            />
          </View>
        )}
  }
  state = {
    moreOptionsVisible: false,
    editTaskModalVisible:false,
    text: '',
  };

  render() {
    return (
      <View>
        <BuddyHeader buddyUsername="Task" onPressMoreButton={()=> this.setState({moreOptionsVisible: true})} />
        <ScrollView>
        <AllTasksComponent />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.5}} />
          <View style={{flex: 8, flexDirection: 'column'}}>
            <Text style={[styles.h1PBB, {fontSize: 16}]}>Description: </Text>

            <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', marginBottom:20}]}>i have planned to do this</Text>

            <Text style={{marginBottom: 20}}>
              <Text style={[styles.h1PBB, {fontSize: 16}]}>End Date/Time:   </Text>
              <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000'}]}>12th November 12:03 </Text>
            </Text>

            <View style={{marginBottom: 20}}>
              <Text style={[styles.h1PBB, {fontSize: 16}]}>Shared with: </Text>
              <UserProfileName/>
            </View>

            <View style={{marginBottom: 20}}>
              <Text style={[styles.h1PBB, {fontSize: 16}]}>Logs: </Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
              <TextInput
              placeholder="Log your Progress (Max Characters 140)" 
              style={[textInput.generalTextInput, {width: wp('75%')}]} 
              maxLength={140}
              returnKeyType="done" />
              <View style={{alignSelf:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#00A1EDC4', width: wp('12%'), height: 40, alignItems:'center', justifyContent:'center', borderRadius: Platform.OS === 'ios' ? 5 : 1}}>
                  <Text style={[styles.bcRBB, {color:'white'}]}>Log it</Text>
                </TouchableOpacity>
              </View>
              </View>
            </View>
            
            <View style={{marginBottom: 20}}>
              <Text style={[styles.h1PBB, {fontSize: 16}]}>Reminders: </Text>
            </View>

          </View>
          <View style={{flex: 0.5}} />
        </View>
        </ScrollView>
        <ReminderVoicemail />

        {/* More Options Button Modal */}
        <BottomModal
          visible={this.state.moreOptionsVisible}
          onTouchOutside={() => {
            this.setState({moreOptionsVisible: false});
          }}
          height={hp('30%')}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {
            this.setState({moreOptionsVisible: false});
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          modalStyle={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: 'transparent',
            flexDirection: 'column',
          }}>
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'none', flex:1}}>
            <View style={{flex:0.5}} />
            <View style={{flex:8, flexDirection:'column'}}>
              <View style={{flex:1, justifyContent:'center'}}>
              <TouchableOpacity
              onPress={()=> this.setState({moreOptionsVisible: false, editTaskModalVisible: true})}
              style={[buttonStyles.buttonBody, {backgroundColor:'#00A1ED'}]}>
                <Text style={[styles.h1PBW, {fontSize: 20, color:'#FFFFFF'}]}>EDIT TASK</Text>
              </TouchableOpacity>
              </View>
              <View style={{flex:1, justifyContent:'center'}}>
              <TouchableOpacity style={[buttonStyles.buttonBody, {backgroundColor:'#00A1ED'}]}>
                <Text style={[styles.h1PBW, {fontSize: 20, color:'#FFFFFF'}]}>DELETE TASK</Text>
              </TouchableOpacity>
              </View>
              <View style={{flex:2, justifyContent:'center'}}>
              <TouchableOpacity onPress={() => {this.setState({moreOptionsVisible: false});}}
              style={[buttonStyles.buttonBody, {backgroundColor:'#00A1ED'}]}>
                <Text style={[styles.h1PBW, {fontSize: 20, color:'#FFFFFF'}]}>CANCEL</Text>
              </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 0.5}} />
          </View>
        </BottomModal>



        {/* Edit TaskModal */}
        <BottomModal
          visible={this.state.editTaskModalVisible}
          onTouchOutside={() => this.setState({editTaskModalVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({editTaskModalVisible: false});}}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('91.2%')}
          modalStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#B5BBC6',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
          {/* <ModalContent> */}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex: 0.5}} />
              <View style={{flex:8, flexDirection:'column', backgroundColor:'none'}}>
                <View style={{flex:0.02,  backgroundColor:'none'}} />
                <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>EDIT TASK</Text>
                <View style={{flex:0.03,  backgroundColor:'none'}} />
                <KeyboardAvoidingView style={{flexDirection:'column'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>TITLE: </Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Title"
                    placeholderTextColor="#333647"
                    style={[textInput.generalTextInput, {color: '#333647', backgroundColor: '#FFFFFF', alignSelf:'center'}]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={() => this.descriptionInput.focus()}
                  />
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </KeyboardAvoidingView>
                <View style={{flex: 0.05, backgroundColor: 'none'}} />
                <KeyboardAvoidingView style={{flexDirection: 'column'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>DESCRIPTION: </Text>
                  <TextInput
                    multiline={true}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {Keyboard.dismiss();}}
                    placeholder="Description (Max Characters 200)"
                    maxLength={200}
                    placeholderTextColor="#333647"
                    style={[
                      textInput.generalTextInput,
                      {color: '#333647', backgroundColor: '#FFFFFF', height: hp('16.25%'), textAlignVertical: 'top', alignSelf:'center'}]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="done"
                    ref={input => (this.descriptionInput = input)}
                  />
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </KeyboardAvoidingView>
                <View style={{flex:0.05, backgroundColor:'none'}} />

                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color: '#000000'}]}>END DATE:  </Text>
                  <TouchableOpacity style={{marginLeft: wp('7.46%')}}>
                    <FontAwesome5 name="calendar-alt" color={'#000000'} size={30} solid={true}/>
                  </TouchableOpacity>
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </View>
                <View style={{flex:0.05, backgroundColor:'none'}} />

                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color: '#000000'}]}>END TIME:  </Text>
                  <TouchableOpacity style={{marginLeft: wp('7.46%')}}>
                    <Icon name="ios-timer" color={'#000000'} size={38} solid={true} />
                  </TouchableOpacity>
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </View>
                <View style={{flex:0.05, backgroundColor:'none'}} />

                <View style={{flex: 1, backgroundColor:'none', justifyContent:'flex-end'}}>
                  <PrimaryButton title="UPDATE TASK" onPressPrimaryButton={()=> this.setState({editTaskModalVisible: false})} />
                </View>

                <View style={{flex: 0.2, backgroundColor:'none'}} />
              </View>
              <View style={{flex: 0.5}} />
            </View>
          </TouchableWithoutFeedback>
          {/* </ModalContent> */}
        </BottomModal>
      </View>
    );
  }
}

export default TaskScreen;
/* NOTES
Display all that is necessary by retrieving from the db
Realtime listeners for logs
Brainstorm what will happen if multiple users are collabing on a task and all of them can log.
*/

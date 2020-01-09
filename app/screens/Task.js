/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, Keyboard} from 'react-native';

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

class TaskScreen extends Component {
  constructor(props) {
    super(props);
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

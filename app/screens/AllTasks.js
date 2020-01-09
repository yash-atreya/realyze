/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SlideAnimation, BottomModal, ModalContent} from 'react-native-modals';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import AllTaskComponent from '../components/AllTasksComponent';
import MainHeader from '../components/MainHeader';
import AddTaskComponent from '../components/AddTaskComponent';
import UserProfileNameComponent from '../components/UserProfileNameComponent';
import PrimaryButton from '../components/PrimaryButton';
import ReminderVoicemail from '../components/ReminderVoicemailComponent';

class AllTasksScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    text: '',
    newTaskVisible: false,
  };
  // toggleModal = () => {
  //   this.setState({visible: !this.state.visible});
  // };

  passData() {
    const text = this.state.text;
    this.data.push({name: text});
    this.setState({newTaskVisible: false});
  }

  data = [{name: 'Yash'}, {name: 'Dharmi'}];

  _renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        {/* Main Screen */}
        <View>
          <MainHeader mainHeaderTitle="Tasks" />
          {/* <FlatList
            data={this.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          /> */}
          <AllTaskComponent
            onPressTask={() => this.props.navigation.navigate('Task')}
          />
        </View>
        {/* New Task Add Button Icon */}
        <View
          style={{
            position: 'absolute',
            marginLeft: wp('81.3%'),
            marginTop: Platform.OS === 'ios' ? hp('79') : hp('80'),
            marginBottom: hp('9.85%'),
            zIndex: 10,
            shadowcolor: '#00000029',
            shadowRadius: 6,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({newTaskVisible: true})}>
            <Icon name="ios-add-circle" color={'#333647'} size={64} />
          </TouchableOpacity>
        </View>

        {/* Create New Task Modal  */}
        <BottomModal
          visible={this.state.newTaskVisible}
          onTouchOutside={() => this.setState({newTaskVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({newTaskVisible: false});}}
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
                <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>NEW TASK</Text>
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
                  <PrimaryButton title="CREATE NEW TASK" onPressPrimaryButton={()=> this.setState({newTaskVisible: false})} />
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

export default AllTasksScreen;


{/* <TouchableOpacity
onPress={()=> this.setState({newTaskVisible: false})}
style={{shadowColor: '#102FC6',shadowOpacity: 0.3,shadowOffset: {width: 0, height: 7},shadowRadius: 11,}}>
<LinearGradient
  start={{x: 0, y: 0}}
  end={{x: 1, y: 0}}
  colors={['#00A1ED', '#0A3BC6']}
  style={[buttonStyles.buttonBody,{alignSelf:'center'}]}>
  <Text style={[styles.h1PBW, {fontSize: 24}]}>CREATE NEW TASK</Text>
</LinearGradient>
</TouchableOpacity> */}

{/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, marginLeft: wp('6.13%')}}>
              <View>
                <Text
                  style={[
                    styles.h1PSBB,
                    {fontSize: 30, color: '#000000', marginTop: hp('2%')},
                  ]}>
                  NEW TASK
                </Text>
              </View>
              <KeyboardAvoidingView>
                <Text
                  style={[
                    styles.bcRBB,
                    {
                      fontSize: 15,
                      marginTop: Platform.OS === 'ios' ? hp('2.3%%') : hp('1%'),
                      color: '#000000',
                    },
                  ]}>
                  TITLE:
                </Text>
                <TextInput
                  placeholder="Title"
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
                  onSubmitEditing={() => this.descriptionInput.focus()}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView>
                <Text
                  style={[
                    styles.bcRBB,
                    {fontSize: 15, marginTop: hp('2.3%'), color: '#000000'},
                  ]}>
                  DESCRIPTION:
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={2}
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  placeholder="Description"
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
                  ref={input => (this.descriptionInput = input)}
                />
              </KeyboardAvoidingView>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp('2.3%'),
                }}>
                <Text style={[styles.bcRBB, {fontSize: 15, color: '#000000'}]}>
                  END DATE:
                </Text>
                <TouchableOpacity
                  onSubmitEditing={() => this.endTimeInput.focus()}
                  ref={input => (this.endDateInput = input)}
                  style={{marginLeft: wp('7.46%')}}>
                  <FontAwesome5
                    name="calendar-alt"
                    color={'#000000'}
                    size={30}
                    solid={true}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp('2.3%'),
                }}>
                <Text style={[styles.bcRBB, {fontSize: 15, color: '#000000'}]}>
                  END TIME:
                </Text>
                <TouchableOpacity
                  ref={input => (this.endTimeInput = input)}
                  style={{marginLeft: wp('7.46%')}}>
                  <Icon
                    name="ios-timer"
                    color={'#000000'}
                    size={38}
                    solid={true}
                  />
                </TouchableOpacity>
              </View>
              {/* {console.log(this.state.text)} */}
          //     <TouchableOpacity
          //       onPress={() => this.passData()}
          //       style={{
          //         shadowColor: '#102FC6',
          //         shadowOpacity: 0.3,
          //         shadowOffset: {width: 0, height: 7},
          //         shadowRadius: 11,
          //         marginTop: Platform.OS === 'ios' ? hp('24%') : hp('25%'),
          //         marginRight: 0,
          //       }}>
          //       <LinearGradient
          //         start={{x: 0, y: 0}}
          //         end={{x: 1, y: 0}}
          //         colors={['#00A1ED', '#0A3BC6']}
          //         style={[
          //           buttonStyles.buttonBody,
          //           {
          //             width: wp('87%'),
          //             // marginTop: hp('31.5%'),
          //           },
          //         ]}>
          //         <Text style={[styles.h1PBW, {fontSize: 24}]}>
          //           CREATE TASK
          //         </Text>
          //       </LinearGradient>
          //     </TouchableOpacity>
          //   </View>
          // </TouchableWithoutFeedback> */}

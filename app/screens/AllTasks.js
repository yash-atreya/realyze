/* eslint-disable no-labels */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllTasksComp from '../components/AllTasksComp';
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

class AllTasksScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
    this.tempTasks = [];
    this.that = this;
  }

  componentDidMount() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Tasks')
      .where('uid', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
        } else {
          doc.forEach(snap => {
            console.log('Tasks: ', snap.data());
            this.tempTasks.push({
              taskId: snap.id,
              data: snap.data(),
            });
          });
          this.setState({tasks: this.tempTasks});
          console.log(
            'STATE TASKS: ',
            JSON.stringify(this.state.tasks, null, 2),
          );
        }
      });
  }

  _renderItem = ({item}) => (
    <View style={{flex: 1}}>
      <AllTasksComp
        title={item.data.title}
        author={item.data.author}
        taskId={item.taskId}
      />
    </View>
  );
  render() {
    console.log('render : ', JSON.stringify(this.state.tasks, null, 2));
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          data={this.state.tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
  }
  state = {
    visible: false,
    text: '',
  };
  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

  passData() {
    const text = this.state.text;
    this.data.push({name: text});
    this.setState({visible: false});
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
          <MainHeader mainHeaderTitle='Tasks' />
          {/* <FlatList
            data={this.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          /> */}
          <AllTaskComponent />
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
          <TouchableOpacity onPress={this.toggleModal}>
            <Icon name="ios-add-circle" color={'#333647'} size={64} />
          </TouchableOpacity>
        </View>

        {/* Create New Task Modal  */}
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
              <TouchableOpacity
                onPress={() => this.passData()}
                style={{
                  shadowColor: '#102FC6',
                  shadowOpacity: 0.3,
                  shadowOffset: {width: 0, height: 7},
                  shadowRadius: 11,
                  marginTop: Platform.OS === 'ios' ? hp('24%') : hp('25%'),
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
                  <Text style={[styles.h1PBW, {fontSize: 24}]}>
                    CREATE TASK
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          {/* </ModalContent> */}
        </BottomModal>
      </View>
    );
  }
}

export default AllTasksScreen;

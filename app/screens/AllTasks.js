/* eslint-disable no-labels */
import React, {Component} from 'react';
import { View, FlatList, Text, TouchableOpacity, Platform, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllTasksComp from '../components/AllTasksComp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

  render() {
    return (
      <View>
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
        <Text style={{fontFamily: 'Raleway-Bold'}}>All Tasks</Text>
        <FontAwesome5 name="list-ul" color={'#000000'} size={24} />
      </View>
    );
  }
}
<<<<<<< HEAD
=======

>>>>>>> Added MainStack Navigation
export default AllTasksScreen;

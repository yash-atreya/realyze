import React, {Component} from 'react';
import {Button, View, Text, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

class UserTasksScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      loading: true,
    };

    this.uid = this.props.navigation.getParam('uid');
    this.username = this.props.navigation.getParam('username');
    this.groupId = this.props.navigation.getParam('groupId');
    this.tempTaskData = [];
  }

  componentDidMount() {
    console.log(this.uid);
    console.log(this.username);
    this.userTasks(this.uid);
  }

  async userTasks(uid) {
    console.log('USER_TASKS()');
    firestore()
      .collectionGroup('TaskGroups')
      .where('authorUid', '==', `${uid}`)
      .where('groupId', '==', `${this.groupId}`)
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log('taskId: ', snap.ref.parent.parent.id); //Gives taskId
          const taskId = snap.ref.parent.parent.id;
          firestore()
            .collection('Tasks')
            .doc(`${taskId}`)
            .get()
            .then(doc => {
              console.log(doc.data().title);
              this.tempTaskData.push({title: doc.data().title, taskId: doc.id});
            })
            .then(() => {
              console.log('tempUserTasks: ', this.tempTaskData);
              this.setState({tasks: this.tempTaskData});
            });
        });
      })
      .then(() => this.setState({loading: false}));
  }
  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Task', {taskId: item.taskId})
        }>
        <Text>{item.title}</Text>
        <Text>{item.taskId}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    console.log('tasksState: ', this.state.tasks);
    return (
      <View>
        {this.state.loading ? (
          <View>
            <Text>{this.username}</Text>
            <Text>No tasks</Text>
          </View>
        ) : (
          <View>
            <Text>{this.username}</Text>
            <FlatList
              data={this.state.tasks}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    );
  }
}

export default UserTasksScreen;

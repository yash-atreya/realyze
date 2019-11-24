/* eslint-disable no-labels */
import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllTasksComp from '../components/AllTasksComp';

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
      </View>
    );
  }
}
export default AllTasksScreen;

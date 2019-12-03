import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

class EditTaskScreen extends Component {
  constructor(props) {
    super(props);

    this.title = this.props.navigation.getParam('title');
    this.taskId = this.props.navigation.getParam('taskId');
    this.author = this.props.navigation.getParam('author');
    this.tempTaskData = [];
    this.state = {
      taskData: {}, //TRy to convert this to an object
      hasBuddy: false,
      loading: true,
    };
  }

  componentDidMount() {
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .get()
      .then(doc => {
        console.log(doc.data());
        this.setState({taskData: doc.data()});
      })
      // .then(() => this.setState({taskData: this.tempTaskData}))
      .then(() => {
        console.log(JSON.stringify(this.state.taskData, null, 2));
        if (
          this.state.taskData.buddyUid != null &&
          this.state.taskData.buddyUsername != null
        ) {
          this.setState({hasBuddy: true});
        } /*else {*/
        //   this.retrieveBuddy(this.state.taskData[0].buddyUid);
        // }
      })
      .catch(err => console.log('Error, unable to load task data', err));

    //Retrive buddy and display if present
  }

  //   retrieveBuddy(buddyUid) {
  //     firestore()
  //       .collection('Users')
  //       .doc(`${buddyUid}`)
  //       .get()
  //       .then(doc => {
  //         console.log(doc.data());
  //         doc.data().username;
  //       });
  //   }

  deleteTask() {
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .delete()
      .then(() => {
        firestore()
          .collection('Logs')
          .where('taskId', '==', `${this.taskId}`)
          .get()
          .then(doc => {
            doc.forEach(snap => {
              console.log(snap.data());
            });
          });
      })
      .then(() => this.deleteLogs())
      .then(() => this.deleteReminders());
  }

  removeBuddy() {
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .update({
        buddyUid: null,
        buddyUsername: null,
      })
      .then(() => console.log('buddy removed'))
      .catch(err => console.log('unable to remove buddy', err));
  }

  render() {
    return (
      <View>
        <Text>EditTaskScreen</Text>
        {this.state.hasBuddy ? (
          <Button title="Remove Buddy" onPress={() => this.removeBuddy()} />
        ) : (
          <Button
            title="Add Buddy"
            onPress={() =>
              this.props.navigation.navigate('AddBuddyToTask', {
                taskId: this.taskId,
                author: this.author,
              })
            }
          />
        )}
        {/* Add to group, don't display groups which are already in the task doc */}
        {/* <Button title="Add to Group" onPress={() => this.props.navigation.navigate('SelectGroup')} /> */}
        <Button title="Delete Task" onPress={() => this.deleteTask()} />
      </View>
    );
  }
}

export default EditTaskScreen;

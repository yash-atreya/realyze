import React, {Component} from 'react';
import {Button, View, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllTasksComp from '../components/AllTasksComp';
import functions from '@react-native-firebase/functions';

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
    };
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
      .catch(err => console.log('Error, unable to load task data', err));
  }

  createLog() {
    const {logText} = this.state;
    const username = auth().currentUser.displayName;
    if (logText === '') {
      console.log('Type something to log it');
      // Add UX to indicate user that nothing has been typed
    } else {
      firestore()
        .collection('Logs')
        .doc()
        .set({
          taskId: this.taskId,
          text: logText,
          date: new Date(),
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

  render() {
    const uid = auth().currentUser.uid;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {uid === this.state.authorUid ? (
          <View>
            <AllTasksComp title={this.state.title} />
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
            <Button title="Incomplete" onPress={() => this.unmarkCompletion()} />
          </View>
        ) : (
          <View>
            <AllTasksComp title={this.state.title} />
            <Button title="Nudge" onPress={() => this.onNudge()} />
          </View>
        )}
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

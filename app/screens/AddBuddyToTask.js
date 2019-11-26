import React, {Component} from 'react';
import {View, FlatList, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import AddBuddyToTaskComp from '../components/AddBuddyToTaskComp';

class AddBuddyToTaskScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [],
      friendsData: [],
      buddy: {},
    };
    this.tempFriends = [];
    this.tempFriendsData = [];
    this.taskId = this.props.navigation.getParam('taskId');

    this.code = this.props.navigation.getParam('code');
    this.title = this.props.navigation.getParam('title');
    this.description = this.props.navigation.getParam('description');
    this.dueDate = this.props.navigation.getParam('dueDate');
    this.dueTime = this.props.navigation.getParam('dueTime');
    this.author = this.props.navigation.getParam('author');
    this.uid = this.props.navigation.getParam('uid');
  }

  componentDidMount() {
    this.fetchFriends()
      .then(() =>
        this.setState({
          friends: this.tempFriends,
        }),
      )
      .then(() => this.fetchEachFriend());
  }

  async fetchFriends() {
    const uid = auth().currentUser.uid;
    await firestore()
      .collection('Friendships')
      .where('senderId', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
          console.log('DOC: ', doc.empty);
        } else {
          doc.forEach(snap => {
            console.log(snap.data().targetId);
            this.tempFriends.push(snap.data().targetId);
            console.log(this.tempFriends);
          });
        }
      })
      .catch(err => console.log('Error DOC1 ', err));
    await firestore()
      .collection('Friendships')
      .where('targetId', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
          console.log('DOC2: ', doc.empty);
        } else {
          doc.forEach(snap => {
            console.log(snap.data().senderId);
            this.tempFriends.push(snap.data().senderId);
            console.log(this.tempFriends);
          });
        }
      })
      .catch(err => console.log('Error DOC2 ', err));
  }

  fetchEachFriend() {
    this.state.friends.forEach(uid => {
      console.log('UID: ', uid);
      firestore()
        .collection('Users')
        .doc(`${uid}`)
        .get()
        .then(doc => {
          console.log('Friend Data ', doc.data());
          this.tempFriendsData.push({
            uid: doc.id,
            data: doc.data(),
          });
        })
        .then(() => this.setState({friendsData: this.tempFriendsData}))
        .catch(err => {
          console.log('Error fetchEachFriend(): ', err);
        });
    });
  }

  addBuddy = (uid, username) => {
    //Add restriction for selecting only one buddy
    const buddy = {uid: uid, username: username};
    this.setState({
      buddy,
    });
  };

  addSelectedBuddyToTask() {
    //Add restriction for selecting only one buddy
    console.log(this.state.buddy);
    firestore()
      .collection('Tasks')
      .doc(`${this.taskId}`)
      .update({
        // Test - May not work as buddyUid and buddyUsername, don't exist yet.
        //Workaround - Creat Fields with value null onCreateTask()
        buddyUid: this.state.buddy.uid,
        buddyUsername: this.state.buddy.username,
      })
      .then(() => console.log('Buddy added'))
      .then(() => this.notifyBuddyAdded())
      .catch(err => console.log('err adding buddy', err));
  }

  onCreateTask() {
    firestore()
      .collection('Tasks')
      .doc()
      .set({
        uid: this.uid,
        author: this.author,
        title: this.title,
        description: this.description,
        dueTime: this.dueTime,
        dueDate: this.dueDate,
        createdOn: new Date(),
        status: 'pending',
        //Show warning if buddy is not selected
        buddyUid: this.state.buddy.uid || null,
        buddyUsername: this.state.buddy.username || null,
      })
      .then(() => {
        console.log('buddy added');
        this.props.navigation.navigate('AllTasks');
        this.notifyBuddyAdded();
      });
  }
  //ClOUD FUNCTION
  notifyBuddyAdded() {
    functions()
      .httpsCallable('notifyBuddyAdded')({
        buddyUid: this.state.buddy.uid,
        buddyUsername: this.state.buddy.username,
      })
      .then(() => console.log('Notified'))
      .catch(err => console.log('err notifying buddy ', err));
  }

  _renderItem = ({item}) => (
    <View>
      <AddBuddyToTaskComp
        email={item.data.email}
        username={item.data.username}
        uid={item.uid}
        addBuddy={this.addBuddy}
      />
    </View>
  );

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          data={this.state.friendsData}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {this.code === 1 ? (
          <Button
            title="Create Task"
            onPress={() => {
              this.onCreateTask();
            }}
          />
        ) : (
          <Button
            title="AddSelectedBuddyToTask"
            onPress={() => this.addSelectedBuddyToTask()}
          />
        )}
      </View>
    );
  }
}

export default AddBuddyToTaskScreen;

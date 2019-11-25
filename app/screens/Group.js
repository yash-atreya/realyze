import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

class GroupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    };

    this.name = this.props.navigation.getParam('name');
    this.groupId = this.props.navigation.getParam('groupId');
    this.tempUserData = [];
  }

  componentDidMount() {
    firestore()
      .collection('Groups')
      .doc(`${this.groupId}`)
      .collection('Members')
      .get()
      .then(doc => {
        doc.forEach(snap => {
          const uid = snap.id;
          firestore() //Retrieving user data to display in circle components
            .collection('Users')
            .doc(`${uid}`)
            .get()
            .then(doc => {
              console.log(doc.data());
              this.tempUserData.push({
                uid: doc.data().uid,
                username: doc.data().username,
                // profilePic: doc.data().profilePic,
              });
            });
        });
      })
      .then(() => this.setState({userData: this.tempUserData}));
  }

  userTasks(uid) {
    firestore()
      .collectionGroup('TaskGroups')
      .where('authorUid', '==', `${uid}`)
      .where('groupId', '==', `${this.groupId}`)
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log(snap.ref.parent.parent.id); //Gives taskId
          const taskId = snap.ref.parent.parent.id;
          firestore()
            .collection('Tasks')
            .doc(`${taskId}`).get().then(doc => {
              var title = doc.data().title;
              var desc = doc.data().desc;
              // var deadline = 
            });
        });
      });
  }

  render() {
    return (
      <View>
        <Text>{this.name}</Text>
        <Text>{this.groupId}</Text>
        <Button
          title="Edit Group"
          onPress={() =>
            this.props.navigation.navigate('EditGroup', {groupId: this.groupId})
          }
        />
        <Button
          title="Add participant"
          onPress={() =>
            this.props.navigation.navigate('AddMembers', {
              code: 1,
              groupId: this.groupId,
            })
          }
        />
      </View>
    );
  }
}

export default GroupScreen;
/* NOTES
Retrive Tasks data from uids retrived and render in tasks component
*/

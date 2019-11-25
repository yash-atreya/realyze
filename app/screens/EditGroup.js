import React, {Component} from 'react';
import {Button, View, Text, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DisplayMembersComp from '../components/DisplayMembers';
import functions from '@react-native-firebase/functions';

class EditGroupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      membersData: [],
    };
    this.groupId = this.props.navigation.getParam('groupId');
    this.membersData = [];
  }

  componentDidMount() {
    firestore()
      .collection('Groups')
      .doc(`${this.groupId}`)
      .get()
      .then(doc => {
        console.log(doc.data());
      });
    firestore()
      .collection('Groups')
      .doc(`${this.groupId}`)
      .collection('Members')
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log(snap.data().username);
          console.log(snap.data().role);
          this.membersData.push({
            uid: snap.data().uid,
            username: snap.data().username,
            role: snap.data().role,
            // joined: snap.data().joinedOn, make a timestamp converter function.
          });
        });
      })
      .then(() => {
        this.setState({membersData: this.membersData});
      });
  }

  leaveGroup() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Groups')
      .doc(`${this.groupId}`)
      .collection('Members')
      .doc(`${uid}`)
      .delete()
      .then(() => console.log('left grp'))
      .then(() => this.notifyLeftGroup())
      .catch(err => console.log('unable to leave grp', err));
  }

  notifyLeftGroup() {
    const uid = auth().currentUser.uid;
    functions()
      .httpsCallable('notifyLeftGroup')({
        groupId: this.groupId,
        uid: uid,
      })
      .then('notfied about leaving grp')
      .catch(err => console.log('unable to notify : ', err));
  }

  _renderItem = ({item}) => {
    return (
      <DisplayMembersComp
        username={item.username}
        role={item.role}
        // joined={item.joined}
      />
    );
  };

  render() {
    return (
      <View>
        <Text>{this.groupId}</Text>
        <Button title="Leave Group" onPress={() => this.leaveGroup()} />
        <FlatList
          data={this.state.membersData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default EditGroupScreen;
/* NOTES 
Make list components to display participants in EditGroup
display their displayName and role
Make a function to convert timestamp retrived from firebase and add it to membersData
Realtime listeners for members in groups
*/

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {withNavigation} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

class FriendRequestComp extends Component {
  constructor(props) {
    super(props);
    this.uid = auth().currentUser.uid;
    this.senderId = this.props.senderId;
  }

  onAcceptRequest() {
    functions()
      .httpsCallable('onAcceptRequest')({
        targetId: this.uid,
        senderId: this.senderId,
      })
      .then(() => {
        console.log('Request Accepted');
        this.deleteRequest();
      })
      .catch(err => console.log('ERROR: ', err));
  }

  // onAcceptRequest() {
  //   firestore()
  //     .collection('Friendships')
  //     .doc()
  //     .set({
  //       uid1: this.uid,
  //       uid2: this.senderId,
  //       timeStamp: new Date(),
  //       //Field: FriendshipId is needed??
  //     })
  //     .then(() => {
  //       console.log('Befriended');
  //       this.deleteRequest();
  //     })
  //     .catch(err => console.log('Error Accepting friend request', err));
  // }

  //   onAcceptRequest() {
  //     //Read All Data
  //     var initialFriendsData = [];
  //     var oppInitialFriendsData = [];
  //     firestore()
  //       .collection('Friends')
  //       .doc(`${this.uid}`)
  //       .get()
  //       .then(doc => {
  //         console.log('FRIENDS: ', doc.id);
  //         initialFriendsData.push(doc.data());
  //         console.log(initialFriendsData);
  //       })
  //       .then(() => {
  //         initialFriendsData.push(this.senderId);
  //         console.log('Data Pushed', initialFriendsData);
  //       }) //Pushing new data to array
  //       .then(
  //         firestore()
  //           .collection('Friends')
  //           .doc(`${this.uid}`)
  //           .update({
  //             friends: initialFriendsData,
  //           }),
  //       )
  //       .then(console.log('currentUsersList updated: '))
  //       .catch(err => console.log('err updating currentUsrslist', err));

  //     firestore()
  //       .collection('Friends')
  //       .doc(`${this.senderId}`)
  //       .get()
  //       .then(doc => {
  //         oppInitialFriendsData.push(doc.data());
  //       })
  //       .then(oppInitialFriendsData.push(this.uid))
  //       .then(
  //         firestore()
  //           .collection('Friends')
  //           .doc(`${this.senderId}`)
  //           .update({
  //             firends: oppInitialFriendsData,
  //           }),
  //       )
  //       .then(console.log('oppFriends data updated'))
  //       .catch(err => console.log('err updating oppFriends data', err));
  //   }

  //   onAcceptRequest() {
  //     //Reading Data and storing to state array
  //     firestore()
  //       .collection('Friends')
  //       .doc(`${this.uid}`)
  //       .get()
  //       .then(doc => {
  //         console.log(doc.exists);
  //       });
  //     //Setting the new data
  //     firestore()
  //       .collection('Friends')
  //       .doc(`${this.uid}`)
  //       .set(
  //         {
  //           uid: this.senderId,
  //         },
  //         {merge: true},
  //       )
  //       .then(() => {
  //         firestore()
  //           .collection('Friends')
  //           .doc(`${this.senderId}`)
  //           .set(
  //             {
  //               uid: this.uid,
  //             },
  //             {merge: true},
  //           )
  //           .then(console.log('Befriended'))
  //           .then(() => this.deleteRequest())
  //           .catch(err => console.log('senders err', err));
  //       })
  //       .catch(err => console.log('currentUsers err', err));
  //   }

  deleteRequest() {
    firestore()
      .collection('Requests')
      .where('targetId', '==', `${this.uid}`)
      .where('senderId', '==', `${this.senderId}`)
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log(snap.id);
          firestore()
            .collection('Requests')
            .doc(`${snap.id}`)
            .delete()
            .then(console.log('Req Deleted'));
        });
      })
      .catch(err => console.log('deleteRequest err: ', err));
  }

  onDeclineRequest() {
    this.deleteRequest();
  }

  render() {
    return (
      <View>
        <Text>{this.senderId}</Text>
        <Button title="Accept" onPress={() => this.onAcceptRequest()} />
        <Button title="Decline" onPress={() => this.onDeclineRequest()} />
      </View>
    );
  }
}

export default withNavigation(FriendRequestComp);

/* NOTES
Add friendshipId field if needed??
Add notifications
*/

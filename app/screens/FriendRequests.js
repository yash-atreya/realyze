import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FriendRequestComp from '../components/FriendRequestComp';

class FriendRequestsScreen extends Component {
  constructor() {
    super();
    this.state = {
      reqs: [],
      friendRequestsPresent: false,
    };
    this.tempReqs = [];
    this.realtimelistener();
  }
  componentDidMount() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Requests')
      .where('targetId', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
          console.log(doc.empty);
        } else {
          doc.forEach(snap => {
            // console.log(snap.data().senderId);
            this.tempReqs.push(snap.data().senderId);
            console.log('Temp Reqs : ', this.tempReqs);
          });
          //   this.setState();
          this.setState({reqs: this.tempReqs, friendRequestsPresent: true});
        }
      });
  }

  realtimelistener() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Requests')
      .where('targetId', '==', `${uid}`)
      .onSnapshot(snap => {
        var changes = snap.docChanges();
        console.log('REALTIME LISTENER !!!!!!!!!!!!!!!!!!!!!!!: ', changes.doc);
      });
  }

  _renderItem = ({item}) => {
    return <FriendRequestComp senderId={item} />;
  };

  render() {
    console.log('state reqs: ', this.state.reqs);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {this.state.friendRequestsPresent ? (
          <FlatList
            data={this.state.reqs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
          />
        ) : (
          <Text>No friend requests</Text>
        )}
      </View>
    );
  }
}

export default FriendRequestsScreen;

/* NOTES:
Test for multiple friend reqs
Retrieve username, profilePic along with uid
Add realtime listeners for receiving requests
Add realtime listener for accepting friend request
Deleting friend requests after being accepted or declined on the display
*/

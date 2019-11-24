import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import UserSummary from '../components/UserSummary';

class AllFriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friendsData: [],
    };
    this.tempFriends = [];
    this.tempFriendsData = [];
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

  _renderItem({item}) {
    return (
      <UserSummary
        email={item.data.email}
        username={item.data.username}
        uid={item.uid}
      />
    );
  }

  render() {
    console.log('STATE RENDER: ', this.state.friendsData);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          data={this.state.friendsData}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default AllFriendsScreen;
/* NOTES
Test for multiple friends
Add catch for possible errors
*/

import React, {Component} from 'react';
import {View, Button, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AddMembersComp from '../components/AddMembersComp';
import functions from '@react-native-firebase/functions';
import {ListItem, SearchBar} from 'react-native-elements';

class AddMembersScreen extends Component {
  constructor(props) {
    super(props);
    this.uid = auth().currentUser.uid;
    this.username = auth().currentUser.displayName;
    this.email = auth().currentUser.email;
    //==========STATE===========
    this.state = {
      friends: [],
      friendsData: [],
      members: [],
      docId: '',
      addMembersToExisting: false,
      dummyData: [
        {name: 'yash', uid: '1'},
        {name: 'tanay', uid: '2'},
        {name: 'dharmi', uid: '3'},
      ],
    };
    //========================

    this.arrayholder = [
      {name: 'yash', uid: '1'},
      {name: 'tanay', uid: '2'},
      {name: 'dharmi', uid: '3'},
    ];
    this.tempFriends = [];
    this.tempFriendsData = [];
    console.log('Add Members Screen');
    this.name = this.props.navigation.getParam('name');
    // this.desc = this.props.navigation.getParam('desc');
    this.code = this.props.navigation.getParam('code');
  }

  componentDidMount() {
    if (this.code) {
      this.setState({addMembersToExisting: true});
      this.groupId = this.props.navigation.getParam('groupId');
      this.name = this.props.navigation.getParam('name');
    }
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
      .where('targetId', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
          console.log('DOC: ', doc.empty);
        } else {
          doc.forEach(snap => {
            console.log(snap.data().senderId);
            this.tempFriends.push(snap.data().senderId);
            console.log(this.tempFriends);
          });
        }
      })
      .catch(err => console.log('Error DOC1 ', err));
    await firestore()
      .collection('Friendships')
      .where('senderId', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
          console.log('DOC2: ', doc.empty);
        } else {
          doc.forEach(snap => {
            console.log(snap.data().targetId);
            this.tempFriends.push(snap.data().targetId);
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

  addMember = (uid, username) => {
    if (this.code === 1) {
      var members = [];
      members.push({uid: uid, username: username});
      this.setState({members});
    } else {
      var members = [
        {
          uid: `${this.uid}`,
          username: `${this.username}`,
        },
      ];
      members.push({uid: uid, username: username});
      this.setState({
        members,
      });
    }
  };

  onAddMembersToExisting() {
    console.log('onAddMembersToExisting()');
    this.state.members.forEach(member => {
      firestore()
        .collection('Groups')
        .doc(`${this.groupId}`)
        .collection('Members')
        .doc(`${member.uid}`)
        .set({
          uid: member.uid,
          username: member.username,
          role: 'participant',
          joinedOn: new Date(),
        })
        .then(() => console.log('New Members Added'))
        .then(() => this.notifyAddedMembers())
        .catch(err => console.log('err adding members to existing group', err));
    });
  }

  //CLOUD FUNCTION
  notifyAddedMembers() {
    functions()
      .httpsCallable('notifyAddedMembers')({
        members: this.state.members,
        groupName: this.name,
      })
      .then(() => console.log('Notified'))
      .catch(err => console.log('error notifying added members', err));
  }

  createGroup() {
    var docRef = firestore()
      .collection('Groups')
      .doc();
    firestore() //Adding field data and Members Sub-collection to group doc
      .runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
          this.setState({docId: doc.id}); // Saving the doc.id for querying later //Check do we really need this??
          transaction.set(docRef, {
            name: this.name,
            desc: this.desc,
            createdOn: new Date(),
          });
        });
      }) //Making a doc for each member in group
      .then(() => {
        this.state.members.forEach(member => {
          firestore()
            .collection('Groups')
            .doc(`${this.state.docId}`)
            .collection('Members')
            .doc(`${member.uid}`)
            .set({
              uid: member.uid,
              username: member.username,
              role: 'participant',
              joinedOn: new Date(),
            });
        });
      }) // Admin Updation
      .then(() => {
        firestore()
          .collection('Groups')
          .doc(`${this.state.docId}`)
          .collection('Members')
          .doc(`${this.uid}`)
          .update({role: 'admin'})
          .then(() => console.log('admin updated'))
          .catch(err => console.log('err updating admin: ', err));
      })
      .then(() => console.log('Group created'))
      //Send notifications
      .then(() => this.notifyAddedMembers())
      .catch(err => console.log('err creating group', err));
  }

  //=====================================SEARCH FUNCTIONALITY=====================

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dummyData: newData,
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  //===================================================

  // _renderItem = ({item}) => (
  //   <View>
  //     <AddMembersComp
  //       email={item.data.email}
  //       username={item.data.username}
  //       uid={item.uid}
  //       name={this.name}
  //       // desc={this.desc}
  //       addMember={this.addMember}
  //     />
  //   </View>
  // );

  //========DUMMY RENDER FOR TESTING SEARCH========
  _renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.uid}</Text>
      </View>
    );
  };

  render() {
    console.log('MEMBERS SCREEN => Member array: ', this.state.members);
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          // data={this.state.friendsData}
          data={this.state.dummyData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
        {this.state.addMembersToExisting ? (
          <Button title="Add" onPress={() => this.onAddMembersToExisting()} />
        ) : (
          <Button title="Create Group" onPress={() => this.createGroup()} />
        )}
      </View>
    );
  }
}

export default AddMembersScreen;
/* NOTES

*/

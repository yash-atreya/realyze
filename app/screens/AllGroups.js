import React, {Component} from 'react';
import {View, FlatList, Button, Text, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllGroupsComp from '../components/AllGroupsComp';
import AddMembersComp from '../components/AddMembersComp';
import functions from '@react-native-firebase/functions';

import Modal, {
  BottomModal,
  ModalContent,
  SlideAnimation,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';

class AllGroupsScreen extends Component {
  constructor(props) {
    super(props);
    //===============STATE================
    this.state = {
      groupData: [],
      createGroupModal: false,
      addMembersModal: false,
      groupName: '',
      friends: [],
      friendsData: [],
      members: [],
      docId: '',
      dummyData: [
        {name: 'yash', uid: '1'},
        {name: 'tanay', uid: '2'},
        {name: 'dharmi', uid: '3'},
      ],
    };
    //======================================
    this.groupData = [];
    this.uid = auth().currentUser.uid;
    this.username = auth().currentUser.displayName;
    this.tempFriends = [];
    this.tempFriendsData = [];
  }

  componentDidMount() {
    const uid = auth().currentUser.uid;
    //COLLECTION GROUP QUERY = CREATED SINGLE FIELD INDEX FOR THIS
    firestore()
      .collectionGroup('Members')
      .where('uid', '==', `${uid}`)
      .get()
      .then(doc => {
        doc.forEach(snap => {
          var groupId = snap.ref.parent.parent.id;
          console.log('groupId: ', groupId);
          firestore()
            .collection('Groups')
            .doc(`${groupId}`)
            .get()
            .then(doc => {
              console.log(doc.data());
              this.groupData.push({
                groupId: groupId,
                name: doc.data().name,
              });
            })
            .then(() => this.setState({groupData: this.groupData}))
            .then(() => console.log('State is set', this.state.groupData));
        });
      });
  }

  //================================================================
  //                           ADD MEMBERS
  //================================================================

  //========================FETCH FRIENDS=======================
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
  //=========================CREATE GROUP=========================

  createGroup() {
    var docRef = firestore()
      .collection('Groups')
      .doc();
    firestore() //Adding field data and Members Sub-collection to group doc
      .runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
          this.setState({docId: doc.id}); // Saving the doc.id for querying later //Check do we really need this??
          transaction.set(docRef, {
            name: this.state.groupName,
            // desc: this.desc,
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
      .then(() => {
        this.setState({addMembersModal: false});
        console.log('Group created');
      })
      //Send notifications
      .then(() => this.notifyAddedMembers())
      .catch(err => console.log('err creating group', err));
  }

  notifyAddedMembers() {
    functions()
      .httpsCallable('notifyAddedMembers')({
        members: this.state.members,
        groupName: this.state.groupName,
      })
      .then(() => console.log('Notified'))
      .catch(err => console.log('error notifying added members', err));
  }

  addMember = (uid, username) => {
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
  };

  //==========================================================================
  _renderItem = ({item}) => {
    console.log('rendeItem');
    return <AllGroupsComp name={item.name} groupId={item.groupId} />;
  };

  _renderFriends = ({item}) => {
    return (
      <View>
        <Text>{item.data.email}</Text>
        <Text>{item.data.username}</Text>
        <Text>{item.uid}</Text>
        <Button
          title="Add"
          onPress={() => {
            this.addMember(item.uid, item.username);
            console.log('onPRess add');
          }}
        />
      </View>
    );
  };

  render() {
    console.log('Friends Data: ', JSON.stringify(this.state.friendsData));
    return (
      <View>
        <FlatList
          data={this.state.groupData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
        <Button
          title="Create Group"
          onPress={() => this.setState({createGroupModal: true})}
        />
        <BottomModal
          height={0.9}
          visible={this.state.createGroupModal}
          footer={
            <ModalFooter>
              <ModalButton
                text="Add Members"
                onPress={() => {
                  this.fetchFriends()
                    .then(() =>
                      this.setState({
                        friends: this.tempFriends,
                      }),
                    )
                    .then(() => this.fetchEachFriend())
                    .then(() => {
                      this.setState({
                        createGroupModal: false,
                        addMembersModal: true,
                      });
                    });
                }}
              />
            </ModalFooter>
          }
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }>
          <ModalContent>
            <Text>Create Group Modal</Text>
            <TextInput
              onChangeText={name => this.setState({groupName: name})}
              placeholder="name"
              style={{
                height: 40,
                width: 100,
                borderColor: 'gray',
                borderWidth: 1,
              }} //Add a group icon input
            />
          </ModalContent>
        </BottomModal>
        {/* =====================ADD MEMBER MODAL========================*/}
        <BottomModal
          height={0.9}
          visible={this.state.addMembersModal}
          footer={
            <ModalFooter>
              <ModalButton
                text="Create Group"
                onPress={() => this.createGroup()}
              />
            </ModalFooter>
          }
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }>
          <ModalContent>
            <Text>Add Members</Text>
            <FlatList
              data={this.state.friendsData}
              renderItem={this._renderFriends}
              keyExtractor={(item, index) => index.toString()}
            />
          </ModalContent>
        </BottomModal>
      </View>
    );
  }
}

export default AllGroupsScreen;

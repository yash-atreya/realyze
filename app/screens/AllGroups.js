/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
import Icons from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Modal, {BottomModal, SlideAnimation} from 'react-native-modals';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import MainHeader from '../components/MainHeader';
import GroupComponent from '../components/GroupComponent';
import BuddyAddComponent from '../components/BuddyAddComponent';

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
    this.state = {
      createGroupVisible: false,
      addMembersVisible: false,
      groupIconsVisible: false,
    };
  }

  render() {
    return (
      <View>
        {/* Main Screen Header */}
        <MainHeader mainHeaderTitle="Groups" />

        {/* New Group Add Button Icon */}
        <View
          style={{
            position: 'absolute',
            marginLeft: wp('81.3%'),
            marginTop: Platform.OS === 'ios' ? hp('79') : hp('80'),
            zIndex: 10,
            shadowcolor: '#00000029',
            shadowRadius: 6,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({createGroupVisible: true})}>
            <Icon name="md-add-circle-outline" color={'#333647'} size={64} />
          </TouchableOpacity>
        </View>

        {/* FlatList Cell Component */}
        <GroupComponent groupName="HOT MOMS CLUB" />


        {/* Create Group Modal */}
        <BottomModal
          visible={this.state.createGroupVisible}
          onTouchOutside={() => this.setState({createGroupVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({createGroupVisible: false});}}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('91.2%')}
          modalStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#B5BBC6',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
          {/* <ModalContent> */}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex: 0.5}} />

              <View style={{flex:8, flexDirection:'column', backgroundColor:'none'}}>
                <View style={{flex:0.02, backgroundColor: 'none'}} />
                <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>NEW GROUP</Text>
                <View style={{flex:0.03, backgroundColor: 'none'}} />
                <View>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>GROUP ICON: </Text>
                  <TouchableOpacity onPress={()=> this.setState({groupIconsVisible: true})}
                    style={{alignSelf: 'center'}}>
                    <View style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                      <Icon name="ios-add" size={56} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.05, backgroundColor: 'none'}} />
                <KeyboardAvoidingView style={{flexDirection: 'column'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>GROUP NAME: </Text>
                  <TextInput
                    maxLength={100}
                    placeholder="Group Name"
                    placeholderTextColor="#333647"
                    style={[textInput.generalTextInput, {color: '#333647', backgroundColor: '#FFFFFF', alignSelf:'center'}]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                    onSubmitEditing={() => this.groupDescriptionInput.focus()}
                  />
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </KeyboardAvoidingView>
                <View style={{flex: 0.05, backgroundColor: 'none'}} />
                <KeyboardAvoidingView style={{flexDirection: 'column'}}>
                  <Text style={[styles.bcRBB, {fontSize: 15, color:'#000000'}]}>GROUP DESCRIPTION: </Text>
                  <TextInput
                    multiline={true}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {Keyboard.dismiss();}}
                    placeholder="Group Description (Max Characters 200)"
                    maxLength={200}
                    placeholderTextColor="#333647"
                    style={[
                      textInput.generalTextInput,
                      {color: '#333647', backgroundColor: '#FFFFFF', height: hp('16.25%'), textAlignVertical: 'top', alignSelf:'center'}]}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="done"
                    ref={input => (this.groupDescriptionInput = input)}
                  />
                  <Text style={[styles.bcRMB, {color:'red', fontSize: 12}]}> Error Message will show here</Text>
                </KeyboardAvoidingView>
                <View style={{flex:0.05, backgroundColor:'none'}} />

                <View style={{flex: 1, backgroundColor:'none', justifyContent:'flex-end'}}>
                  <PrimaryButton title="NEXT" onPressPrimaryButton={() => {this.setState({addMembersVisible: true,});}} />
                </View>

                <View style={{flex: 0.2, backgroundColor:'none'}} />
              </View>
              <View style={{flex: 0.5}} />
            </View>
          </TouchableWithoutFeedback>
          {/* </ModalContent> */}
        </BottomModal>

        {/* Group Icons Modal */}
        <BottomModal
          visible={this.state.groupIconsVisible}
          onTouchOutside={() => this.setState({groupIconsVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({groupIconsVisible: false});}}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('50%')}
          modalStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#B5BBC6',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
          <View style={{flexDirection:'row', flex:1}}>
            <View style={{flex: 0.03}} />

            <View style={{flexDirection:'column', justifyContent:'space-around', flex:1}}>
              <View style={{flex: 0.2}} />
              {/* 1st Row of Group Icons */}
              <View style={{flexDirection: 'row', flex:1, justifyContent:'space-around'}}> 
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="book" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>STUDY</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="code" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>CODING</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <Icon name="ios-fitness" size={40} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>FITNESS</Text>
                </View>
              </View>
              {/* 2nd Row of Group Icons */}
              <View style={{flexDirection: 'row', flex:1, justifyContent:'space-around'}}> 
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="money" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>FINANCE</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="users" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>FAMILY</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="blog" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>WRITING</Text>
                </View>
              </View>
              {/* 3rd Row of Group Icons */}
              <View style={{flexDirection: 'row', flex:1, justifyContent:'space-around'}}> 
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="business-time" size={30}/>
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>WORK</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesome5Icon name="map-marked-alt" size={30} />
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>TRAVEL</Text>
                </View>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
                    <FontAwesomeIcon name="shopping-cart" size={30}/>
                  </TouchableOpacity>
                  <View style={{flex: 0.01}} />
                  <Text style={[styles.bcRBB, {fontSize: 14}]}>SHOPPING</Text>
                </View>
              </View>
              <View style={{flex:0.4}} />
            </View>
            <View style={{flex: 0.03}} />
          </View>
          </BottomModal>

        {/* Add Member Modal */}
        <BottomModal
          visible={this.state.addMembersVisible}
          onTouchOutside={() => this.setState({addMembersVisible: false})}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {this.setState({addMembersVisible: false});}}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('85%')}
          modalStyle={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            backgroundColor: '#B5BBC6',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex: 0.5}} />

              <View style={{flex:8, flexDirection:'column', backgroundColor:'none'}}>
                <View style={{flex:0.02, backgroundColor: 'none'}} />
                <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>ADD BUDDIES</Text>
                <View style={{flex:0.03, backgroundColor: 'none'}} />
                <TextInput
                  placeholder="Search Buddies"
                  style={[textInput.generalTextInput, {alignSelf:'center'}]} />
                <View style={{flex:0.03, backgroundColor: 'none'}} />

                <BuddyAddComponent  onUserProfilePress={()=> this.props.navigation.navigate('UserProfile')} />

                <View style={{flex: 1, backgroundColor:'none', justifyContent:'flex-end'}}>
                  <PrimaryButton
                  title="DONE" 
                  onPressPrimaryButton={() => {this.setState({addMembersVisible: false, createGroupVisible: false});}} />
                </View>
                {/* Bottom Spacer for last Primary Icon */}
                <View style={{flex: 0.08, backgroundColor:'none'}} />
              </View>
              <View style={{flex: 0.5}} />
            </View>
          </TouchableWithoutFeedback>
        </BottomModal>
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    borderWidth: 3,
    borderColor: '#00A1ED',
    // borderColor: '#56575D',
    // borderColor: '#333647',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});


export default AllGroupsScreen;

        // <BottomModal
        //   visible={this.state.createGroupVisible}
        //   height={0.8}>
        //   <Text>Create Group Modal</Text>
        //   <Button
        //     onPress={() => {
        //       this.setState({
        //         // createGroupVisible: false,
        //         addMembersVisible: true,
        //       });
        //     }}
        //     title="Next"
        //   />
        // </BottomModal>

// Icons : 

// Study : 
// <FontAwesome5Icon name="book" size={30} />

// Code : 
// <FontAwesomeIcon name="code" size={30} />

// Workout : 
// <Icon name="ios-fitness" size={40}/>

// Finance/Accounts :
// <FontAwesomeIcon name="money" size={30}/>

// Family/Meeting : 
// <FontAwesomeIcon name= "users" size={30}/>

// Blog/Write : 
// <FontAwesome5Icon name="blog" size={30}/>

// Work : 
// <FontAwesome5Icon name="business-time" size={30}/>

// Travel : 
// <FontAwesome5Icon name= "map-marked-alt" size={30}/>

// Shopping : 
// <FontAwesomeIcon name="shopping-cart" size={30}/>
import React, {Component} from 'react';
import {View, FlatList, Button, Text, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllGroupsComp from '../components/AllGroupsComp';
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
    };
    //======================================
    this.groupData = [];
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

  //===========================ADD MEMBERS==========================

  _renderItem = ({item}) => {
    console.log('rendeItem');
    return <AllGroupsComp name={item.name} groupId={item.groupId} />;
  };

  render() {
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
          visible={this.state.createGroupModal}
          footer={
            <ModalFooter>
              <ModalButton
                text="Add Members"
                onPress={() =>
                  this.setState({
                    createGroupModal: false,
                    addMembersModal: true,
                  })
                }
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
        <BottomModal
          visible={this.state.addMembersModal}
          footer={
            <ModalFooter>
              <ModalButton
                text="Disappear"
                onPress={() => this.setState({addMembersModal: false})}
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
          </ModalContent>
        </BottomModal>
      </View>
    );
  }
}

export default AllGroupsScreen;

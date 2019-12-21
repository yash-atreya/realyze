import React, {Component} from 'react';
import {Button, View, Text, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

class GroupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      loading: true,
      dummyUserData: [
        {username: 'Yash', uid: '1'},
        {username: 'Djarmi', uid: '2'},
        {username: 'tanay', uid: '3'},
      ],
    };

    this.name = this.props.navigation.getParam('name');
    this.groupId = this.props.navigation.getParam('groupId');
    this.tempUserData = [];
  }

  componentDidMount() {
    this.fetchUsers();
  }
  async fetchUsers() {
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
              this.tempUserData.push({
                uid: doc.id,
                username: doc.data().username,
              });
            })
            .then(() =>
              this.setState({userData: this.tempUserData, loading: false}),
            );
        });
      })
      .catch(err => console.log(err));
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
            .doc(`${taskId}`)
            .get()
            .then(doc => {
              var title = doc.data().title;
              var desc = doc.data().desc;
              // var deadline =
            });
        });
      });
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('UserTasks', {
            uid: item.uid,
            username: item.username,
            groupId: this.groupId,
          })
        }>
        <Text>{item.uid}</Text>
        <Text>{item.username}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    console.log('USerDAta: ', JSON.stringify(this.state.userData, null, 2));
    return (
      <View>
        {this.state.loading ? (
          <View>
            <Text>{this.name}</Text>
            <Text>{this.groupId}</Text>
            <Text>Loading users ...</Text>
          </View>
        ) : (
          <View>
            <Text>{this.name}</Text>
            <Text>{this.groupId}</Text>
            <View>
              <FlatList
                data={this.state.dummyUserData}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              />
            </View>
          </View>
        )}
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
              name: this.name,
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

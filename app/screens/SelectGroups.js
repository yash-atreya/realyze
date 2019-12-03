import React, {Component} from 'react';
import {View, Button, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SelectGroupsComp from '../components/SelectGroupsComp';
import functions from '@react-native-firebase/functions';

class SelectGroupsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupData: [],
      groups: [],
      docId: '',
    };
    this.groupData = [];
    this.groups = [];
  }
  componentDidMount() {
    const uid = auth().currentUser.uid;
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
                groupName: doc.data().name,
              });
            })
            .then(() => this.setState({groupData: this.groupData}))
            .then(() => console.log('groupData_State', this.state.groupData));
        });
      });
  }

  addGroup = (groupId, groupName) => {
    this.groups.push({groupId: groupId, groupName: groupName});
    console.log(
      'Added to groups array: ',
      JSON.stringify(this.groups, null, 2),
    );
  };

  onCreateTask() {
    //Possibly move to cloud functions as we might call this from this page and also select group page.
    var uid = auth().currentUser.uid;
    var displayName = auth().currentUser.displayName;
    const title = this.props.navigation.getParam('title');
    const desc = this.props.navigation.getParam('description');
    const dueTime = this.props.navigation.getParam('dueTime');
    const dueDate = this.props.navigation.getParam('dueDate');
    this.setState({groups: this.groups});
    var docRef = firestore()
      .collection('Tasks')
      .doc();
    firestore()
      .runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
          this.setState({docId: doc.id});
          transaction.set(docRef, {
            uid: uid,
            author: displayName,
            title: title,
            description: desc,
            dueTime: dueTime,
            dueDate: dueDate,
            createdOn: new Date(),
            status: 'pending',
          });
        });
      }) // IF NO GRP IS SELECTED ??
      .then(() => {
        console.log('Fields Are Set');
        console.log('JSON: ', JSON.stringify(this.state.groups, null, 2));
        if (this.state.groups.length === false) {
          // ERROR : NO GROUP SELECTED
          return null;
        }
        this.state.groups.forEach(group => {
          firestore()
            .collection('Tasks')
            .doc(`${this.state.docId}`)
            .collection('TaskGroups')
            .doc(`${group.groupId}`)
            .set({
              groupId: group.groupId,
              groupName: group.groupName,
              timestamp: new Date(),
            });
        });
      })
      // Sending notification
      .then(() => this.newTaskAdded())
      .catch(err => console.log('Error adding task to groups', err));
  }

  //CLOUD FUNCTION
  newTaskAdded() {
    const title = this.props.navigation.getParam('title');
    const uid = auth().currentUser.uid;
    const displayName = auth().currentUser.displayName;
    functions()
      .httpsCallable('newTaskAdded')({
        groups: this.state.groups,
        taskTitle: title,
        taskId: this.state.docId,
        uid: uid,
        author: displayName,
      })
      .then(() => console.log('Notifications sent'))
      .catch(err => console.log('error sending notifications ', err));
  }

  _renderItem = ({item}) => {
    //Called in Flatlist
    console.log('rendeItem');
    return (
      <SelectGroupsComp
        groupName={item.groupName}
        groupId={item.groupId}
        addGroup={this.addGroup}
      />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.groupData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
        <Button title="Create Task" onPress={() => this.onCreateTask()} />
      </View>
    );
  }
}

export default SelectGroupsScreen;

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {withNavigation} from 'react-navigation';

class AddMembersComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addedMembers: [],
    };

    this.email = this.props.email;
    this.username = this.props.username;
    this.uid = this.props.uid;
    this.name = this.props.name;
    // this.desc = this.props.desc;

    this.members = [];
  }

  // async addMembers() {
  //   await this.members.push(this.uid);
  // }

  // createGroup() {
  //   var docRef = firestore()
  //     .collection('Groups')
  //     .doc();
  //   firestore()
  //     .runTransaction(transaction => {
  //       return transaction.get(docRef).then(doc => {
  //         this.setState({docId: doc.id});
  //         transaction.set(docRef, {
  //           name: this.name,
  //           desc: this.desc,
  //           createdOn: new Date(),
  //         });
  //       });
  //     })
  //     .then(() => {
  //       console.log('this.members: ', this.members);
  //       this.setState({addedMembers: this.members});
  //       console.log('state members: ', this.state.addedMembers);
  //     })
  //     .then(() => {
  //       this.state.addedMembers.forEach(member => {
  //         firestore()
  //           .collection('Groups')
  //           .doc(`${this.state.docId}`)
  //           .collection('Members')
  //           .doc(`${member}`)
  //           .set({
  //             role: 'participant',
  //             joinedOn: new Date(),
  //           });
  //       });
  //     });
  // }

  render() {
    return (
      <View>
        {/* <Text>{this.email}</Text>
        <Text>{this.username}</Text> */}
        <Text>{this.uid}</Text>
        <Button
          title="Add"
          onPress={() => this.props.addMember(this.uid, this.username)}
        />
        {/* <Button title="Create Group" onPress={() => this.createGroup()} /> */}
      </View>
    );
  }
}

export default withNavigation(AddMembersComp);

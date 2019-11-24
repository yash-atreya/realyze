import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import functions from '@react-native-firebase/functions';

//What needs to be displayed in the UserProfile ?? @DHARMI

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      requestSent: false,
      isOnline: Boolean, //Use NetInfo
    };
    this.checkRequest();
    this.checkIfFriends();
    this.tempUserData = [];
    this.profileId = this.props.navigation.getParam('profileId');
  }

  componentDidMount() {
    firestore()
      .collection('Users')
      .doc(`${this.profileId}`)
      .get()
      .then(data => {
        this.tempUserData.push(data.data());
        console.log(this.tempUserData);
        this.setState({userData: this.tempUserData});
        console.log('STATE: ', this.state.userData);
      });
  }

  checkIfFriends() {
    const profileId = this.props.navigation.getParam('profileId');
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Friendships')
      .where('senderId', '==', `${uid}`)
      .where('targetId', '==', `${profileId}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
        } else {
          this.setState({requestSent: true});
        }
      });
    firestore()
      .collection('Friendships')
      .where('targetId', '==', `${profileId}`)
      .where('senderId', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
        } else {
          this.setState({requestSent: true});
        }
      });
  }

  checkRequest() {
    const profileId = this.props.navigation.getParam('profileId');
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Requests')
      .where('senderId', '==', `${uid}`)
      .where('targetId', '==', `${profileId}`)
      .get()
      .then(doc => {
        if (doc.empty === true) {
          null;
          console.log('Doc is empty');
        } else {
          doc.forEach(snap => {
            console.log(snap.id, '=>', snap.data().status);
            snap.data().status === 'sent'
              ? this.setState({requestSent: true})
              : false;
          });
        }
      });

    firestore()
      .collection('Requests')
      .where('targetId', '==', `${uid}`)
      .where('senderId', '==', `${profileId}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
        } else {
          doc.forEach(snap => {
            snap.data().status === 'sent'
              ? this.setState({requestSent: true})
              : false;
          });
        }
      });
  }
  // sendRequest() {
  //   const uid = auth().currentUser.uid;
  //   firestore()
  //     .collection('Requests')
  //     .doc()
  //     .set({
  //       targetId: this.profileId,
  //       senderId: uid,
  //       sentAt: new Date(),
  //       status: 'sent',
  //     })
  //     .then(() => {
  //       console.log('req sent');
  //       this.setState({requestSent: true});
  //     });
  // }

//   sendRequest() {
//     const uid = auth().currentUser.uid;
//     functions()
//       .httpsCallable('sendRequest')({
//         senderId: uid,
//         targetId: this.profileId,
//         status: 'sent',
//       })
//       .then(() => {
//         console.log('Request Sent');
//         this.setState({requestSent: true});
//       })
//       .catch(err => console.log('error sending request', err));
//   }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{this.state.userData.map(data => data.email)}</Text>
        <Text>{this.state.userData.map(data => data.username)}</Text>
        {this.state.requestSent ? null : (
          <Button title="Send Req" onPress={() => this.sendRequest()} />
        )}
      </View>
    );
  }
}

export default UserProfileScreen;
/*NOTES 
Change lingo for state.requestSent;
Further optimization,
If checkRequest() evaluates to be tru then we don't need to run checkIfFriends() and vice-versa, 
unless if we find a more specific but different use for the two methods.
*/

import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import UserSummary from '../components/UserSummary';

class AddFriendsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.tempFriends = [];
    this.tempUserData = [];
  }
  componentDidMount() {
    console.log(JSON.stringify(this.props, null, 2));
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Users')
      .get()
      .then(doc => {
        doc.forEach(doc => {
          firestore()
            .collection('Users')
            .doc(`${doc.id}`)
            .get()
            .then(doc => {
              if (doc.id !== uid) {
                this.tempFriends.push({
                  uid: doc.id,
                  data: doc.data(),
                });
                console.log('userData', this.tempFriends);
                this.setState({users: this.tempFriends});
                console.log(
                  'State users: ',
                  JSON.stringify(this.state.users, null, 2),
                );
              }
            });
        });
      });
  }

  _renderItem = ({item}) => (
    <View>
      <UserSummary
        email={item.data.email}
        username={item.data.username}
        uid={item.uid}
        //navigation={this.props.navigation} //Passing the navigation props to <UserSummary> Component //USED withNavigator() instead
      />
    </View>
  );

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlatList
          data={this.state.users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default AddFriendsScreen;

/* NOTES 
Check whether the opposite user has already sent a request
*/

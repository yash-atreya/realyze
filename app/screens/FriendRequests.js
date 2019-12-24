import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import {ListItem, SearchBar} from 'react-native-elements';
import FriendRequestComp from '../components/FriendRequestComp';

class FriendRequestsScreen extends Component {
  constructor() {
    super();
    //=========STATE=========
    this.state = {
      reqs: [],
      friendRequestsPresent: false,
      error: null,
      value: '',
    };
    //==========================
    this.arrayholder = [
      {name: 'yash', uid: '1'},
      {name: 'tanay', uid: '2'},
      {name: 'dharmi', uid: '3'},
    ];
    this.tempReqs = [];
    this.realtimelistener();
  }
  componentDidMount() {
    this.fetchRequests();
  }

  fetchRequests() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Requests')
      .where('targetId', '==', `${uid}`)
      .get()
      .then(doc => {
        if (doc.empty) {
          null;
          console.log(doc.empty);
        } else {
          doc.forEach(snap => {
            // console.log(snap.data().senderId);
            this.tempReqs.push(snap.data().senderId);
            console.log('Temp Reqs : ', this.tempReqs);
          });
          //   this.setState();
          this.setState({reqs: this.tempReqs, friendRequestsPresent: true});
        }
      });
  }
  realtimelistener() {
    const uid = auth().currentUser.uid;
    firestore()
      .collection('Requests')
      .where('targetId', '==', `${uid}`)
      .onSnapshot(snap => {
        var changes = snap.docChanges();
        console.log('REALTIME LISTENER !!!!!!!!!!!!!!!!!!!!!!!: ', changes.doc);
      });
  }

  // searchFilterFunction = text => {
  //   this.setState({
  //     value: text,
  //   });

  //   const newData = this.arrayholder.filter(item => {
  //     const itemData = `${item.name.toUpperCase()}`;
  //     const textData = text.toUpperCase();

  //     return itemData.indexOf(textData) > -1;
  //   });
  //   this.setState({
  //     reqs: newData,
  //   });
  // };

  // renderSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: '86%',
  //         backgroundColor: '#CED0CE',
  //         marginLeft: '14%',
  //       }}
  //     />
  //   );
  // };

  // renderHeader = () => {
  //   return (
  //     <SearchBar
  //       placeholder="Type Here..."
  //       lightTheme
  //       round
  //       onChangeText={text => this.searchFilterFunction(text)}
  //       autoCorrect={false}
  //       value={this.state.value}
  //     />
  //   );
  // };

  _renderItem = ({item}) => {
    return <FriendRequestComp senderId={item} />;
  };

  // _renderItem = ({item}) => {
  //   return (
  //     <View>
  //       <Text>{item.name}</Text>
  //       <Text>{item.uid}</Text>
  //     </View>
  //   );
  // };

  render() {
    console.log('state reqs: ', this.state.reqs);
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* {this.state.friendRequestsPresent ? ( */}
        <FlatList
          data={this.state.reqs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          // ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
        {/* ) : ( */}
        {/* <Text>No friend requests</Text> */}
        {/* )} */}
      </View>
    );
  }
}

export default FriendRequestsScreen;

/* NOTES:
Test for multiple friend reqs
Retrieve username, profilePic along with uid
Add realtime listeners for receiving requests
Add realtime listener for accepting friend request
Deleting friend requests after being accepted or declined on the display
*/

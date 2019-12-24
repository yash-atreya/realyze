import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import UserSummary from '../components/UserSummary';
// import {ListItem, SearchBar} from 'react-native-elements';

class AddFriendsScreen extends Component {
  constructor(props) {
    super(props);
    //===================STATE============
    this.state = {
      users: [],
      value: '',
      dummyData: [
        {name: 'yash', uid: '1'},
        {name: 'tanay', uid: '2'},
        {name: 'dharmi', uid: '3'},
      ],
    };
    //================================
    this.arrayholder = [
      {name: 'yash', uid: '1'},
      {name: 'tanay', uid: '2'},
      {name: 'dharmi', uid: '3'},
    ];

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

  //=============================SEARCH FUNCTIONALITY==============================

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
  //     dummyData: newData,
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

  // ================================================================================
  _renderItem = ({item}) => (
    <View>
      <UserSummary
        email={item.data.email}
        username={item.data.username}
        uid={item.uid}
      />
    </View>
  );

  //========DUMMY RENDER FOR TESTING SEARCH========
  // _renderItem = ({item}) => {
  //   return (
  //     <View>
  //       <Text>{item.name}</Text>
  //       <Text>{item.uid}</Text>
  //     </View>
  //   );
  // };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={this.state.users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          // ItemSeparatorComponent={this.renderSeparator}
          // ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default AddFriendsScreen;

/* NOTES 
Check whether the opposite user has already sent a request
*/

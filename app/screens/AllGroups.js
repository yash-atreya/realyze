import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AllGroupsComp from '../components/AllGroupsComp';

class AllGroupsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupData: [],
    };

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
      </View>
    );
  }
}

export default AllGroupsScreen;

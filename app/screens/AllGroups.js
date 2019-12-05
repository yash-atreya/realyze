import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

class AllGroupsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={{fontFamily: 'Raleway-Bold'}}>All Groups</Text>
        <Icons name="ios-people" color={'#000000'} size={24} />
      </View>
    );
  }
}

export default AllGroupsScreen;

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class AllNotificationsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={{fontFamily: 'Raleway-Bold'}}>All Tasks</Text>
        <Icon name="ios-notifications" color={'#000000'} size={24} />
      </View>
    );
  }
}

export default AllNotificationsScreen;

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class AllTasksScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={{fontFamily: 'Raleway-Bold'}}>All Tasks</Text>
        <FontAwesome5 name="list-ul" color={'#000000'} size={24} />
      </View>
    );
  }
}

export default AllTasksScreen;

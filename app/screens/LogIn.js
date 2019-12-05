import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={{fontFamily: 'Raleway-Bold'}}>Login Page</Text>
        <Icon name="ios-people" color={'#000000'} size={24} />
        <Button
          title="Go to MainStack"
          onPress={() => this.props.navigation.navigate('AllTasks')}
        />
      </View>
    );
  }
}

export default LogInScreen;

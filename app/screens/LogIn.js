import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';

class LogInScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  render() {
    return (
      <View>
        {/* <TextInput placeholder="email" onChangeText={email => this.setState({email: email})}>
                <Button onPress={() => this.signIn} */}
        <Text>LogInScreen</Text>
      </View>
    );
  }
}

export default LogInScreen;

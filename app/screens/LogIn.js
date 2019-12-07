import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput} from '../../styles';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={{fontFamily: 'Raleway-Bold'}}>Login Page</Text>
        <Icon name="ios-people" color={'#000000'} size={24} />
        <TextInput
          placeholder="Username or Email-id"
          placeholderTextColor="#333647"
          style={textInput.generalTextInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          title="Go to MainStack"
          onPress={() => this.props.navigation.navigate('AllTasks')}
        />
        <PrimaryButton title="LOGIN" onPress="AllTasks" />
      </View>
    );
  }
}

export default LogInScreen;

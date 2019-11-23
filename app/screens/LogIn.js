import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';


class LogInScreen extends Component {
  constructor(props) {
    super(props);
    console.log('LOGIN SCREEN');
    this.state = {
      email: '',
      password: '',
      error: '',
      username: '',
      loading: Boolean,
      isOnline: Boolean,
    };
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
        if(state.isInternetReachable) {
            this.setState({isOnline: true});
        }
        else {
            this.setState({isOnline: false});
        }
      });
  }

  onSignIn() {
    const {email, password} = this.state;
    console.log(email);
    console.log(password);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('=======Signed In========');
        this.props.navigation.navigate('Profile');
      })
      .catch(err => {
        console.log('ERROR SIGNING IN');
        console.log(err);
      });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Log In</Text>
        <TextInput
          onChangeText={email => this.setState({email: email})}
          placeholder="username or email"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          onChangeText={password => this.setState({password: password})}
          secureTextEntry
          placeholder="password"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <Button
          title="Login"
          onPress={() => {
            this.onSignIn();
          }}
        />
        <Button
          title="Or SignUp"
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}
        />
      </View>
    );
  }
}

export default LogInScreen;

/* NOTES 
Setup Forgot paswword or email?
*/


import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

class ReAuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      isOnline: Boolean,
      loading: Boolean,
    };

    this.code = this.props.navigation.getParam('code');
    this.newEmail = this.props.navigation.getParam('newEmail');
    console.log(this.code);
    console.log(this.newEmail);
  }

  onReAuth() {
    const {email, password} = this.state;
    var user = auth().currentUser;
    console.log(password);
    var credentials = auth.EmailAuthProvider.credential(user.email, password);
    auth()
      .currentUser.reauthenticateWithCredential(credentials)
      .then(() => {
        console.log('Re-Authed');
        console.log(this.code);
      })
      .then(() => this.edel())
      .catch(error => console.log(error));
  }

  onEmailVerification() {
    auth()
      .currentUser.sendEmailVerification()
      .then(() => console.log('Email Verification sent'))
      .catch(error => console.log('Email Not Sent' + error));
  }

  edel() {
    if (this.code === 1) {
      console.log('Delete Account Method');
      auth()
        .currentUser.delete()
        .then(() => console.log('Account Deleted'))
        .then(() => this.props.navigation.navigate('Auth'))
        .catch(err => console.log(err + ' Error in deleting account'));
    } else if (this.code === 2) {
      console.log('Update Email Method');
      auth()
        .currentUser.updateEmail(this.newEmail)
        .then(() => console.log('Email Updated'))
        .then(() => this.onEmailVerification())
        .then(() => this.props.navigation.navigate('Home'))
        .catch(err => console.log('Error Updating Email ' + err));
    } else if (this.code === 3) {
      this.props.navigation.navigate('UpdatePassword');
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Re Authenticate</Text>
        <TextInput
          onChangeText={password => this.setState({password: password})}
          secureTextEntry
          placeholder="password"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <Button
          title="Re Auth"
          onPress={() => {
            this.onReAuth();
          }}
        />
      </View>
    );
  }
}

export default ReAuthScreen;

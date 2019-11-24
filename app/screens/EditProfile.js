import React, {Component} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmail: '',
      newDisplayName: '',
    };
  }

  onSaveEmail() {
    const {newEmail} = this.state;
    this.props.navigation.navigate('ReAuth', {code: 2, newEmail: newEmail});
  }

  onSaveName() {
    const {newDisplayName} = this.state;
    console.log(newDisplayName);
    const user = auth().currentUser;
    user
      .updateProfile({
        displayName: newDisplayName,
      })
      .then(() => console.log('Users Display Name is updated'))
      .then(() => console.log(auth().currentUser.displayName))
      .catch(err => console.log('Error updating display name' + err));
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Edit Profile</Text>
        <TextInput
          onChangeText={email => this.setState({email: email})}
          value={auth().currentUser.email}
          editable={true}
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          onChangeText={newEmail => this.setState({newEmail: newEmail})}
          placeholder="New Email"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          onChangeText={newDisplayName =>
            this.setState({newDisplayName: newDisplayName})
          }
          placeholder="Display Name"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <Button
          title="Save Email"
          onPress={() => {
            this.onSaveEmail();
          }}
        />
        <Button title="Save Display Name" onPress={() => this.onSaveName()} />
      </View>
    );
  }
}

export default EditProfileScreen;

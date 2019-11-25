import React, {Component} from 'react';
import {Button, View, TextInput} from 'react-native';

class CreateGroupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      error: '',
      loading: '',
      isOnline: '',
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          onChangeText={name => this.setState({name: name})}
          placeholder="name"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}} //Add a group icon input
        />
        {/* <TextInput
          onChangeText={desc => this.setState({description: desc})}
          placeholder="description"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        /> */}
        <Button
          title="Create Group"
          onPress={() =>
            this.props.navigation.navigate('AddMembers', {
              name: this.state.name,
              // desc: this.state.desc,
            })
          }
        />
      </View>
    );
  }
}

export default CreateGroupScreen;

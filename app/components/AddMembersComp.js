import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {withNavigation} from 'react-navigation';

class AddMembersComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addedMembers: [],
    };

    this.email = this.props.email;
    this.username = this.props.username;
    this.uid = this.props.uid;
    this.name = this.props.name;
    // this.desc = this.props.desc;

    this.members = [];
  }

  render() {
    return (
      <View>
        <Text>{this.email}</Text>
        <Text>{this.username}</Text>
        <Text>{this.uid}</Text>
        <Button
          title="Add"
          onPress={() => {
            this.props.addMember(this.uid, this.username);
            console.log('onPRess add');
          }}
        />
      </View>
    );
  }
}

export default withNavigation(AddMembersComp);

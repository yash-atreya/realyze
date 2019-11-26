import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {withNavigation} from 'react-navigation';

class AddBuddyToTaskComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addedBuddy: [],
    };

    this.email = this.props.email;
    this.username = this.props.username;
    this.uid = this.props.uid;

    this.buddy = [];
  }

  render() {
    return (
      <View>
        <Text>{this.email}</Text>
        <Text>{this.username}</Text>
        <Text>{this.uid}</Text>
        <Button
          title="Add"
          onPress={() => this.props.addBuddy(this.uid, this.username)}
        />
      </View>
    );
  }
}

export default withNavigation(AddBuddyToTaskComp);

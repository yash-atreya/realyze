import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {withNavigation} from 'react-navigation';

class SelectGroupsComp extends Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.groupId = this.props.groupId;
  }

  render() {
    return (
      <View>
        <Text>{this.name}</Text>
        <Button
          title="Add"
          onPress={() => this.props.addGroup(this.groupId, this.name)}
        />
      </View>
    );
  }
}

export default withNavigation(SelectGroupsComp);

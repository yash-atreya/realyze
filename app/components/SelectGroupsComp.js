import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {withNavigation} from 'react-navigation';

class SelectGroupsComp extends Component {
  constructor(props) {
    super(props);

    this.groupName = this.props.groupName;
    this.groupId = this.props.groupId;
  }

  render() {
    return (
      <View>
        <Text>{this.groupName}</Text>
        <Button
          title="Add"
          onPress={() => this.props.addGroup(this.groupId, this.groupName)}
        />
      </View>
    );
  }
}

export default withNavigation(SelectGroupsComp);

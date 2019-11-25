import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

class AllGroupsComp extends Component {
  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.groupId = this.props.groupId;
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Group', {
              name: this.name,
              groupId: this.groupId,
            })
          }>
          <Text>{this.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(AllGroupsComp);

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';

class DisplayMembersComp extends Component {
  constructor(props) {
    super(props);

    this.username = this.props.username;
    this.role = this.props.role;
    // this.joined = this.props.joined;
  }

  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text>{this.username}</Text>
          <Text>{this.role}</Text>
          {/* <Text>{this.joined}</Text> */}
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(DisplayMembersComp);

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

class AllGroupsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            marginLeft: wp('81.3%'),
            marginTop: Platform.OS === 'ios' ? hp('79') : hp('80'),
            zIndex: 10,
            shadowcolor: '#00000029',
            shadowRadius: 6,
          }}>
          <TouchableOpacity onPress={this.toggleModal}>
            <Icon name="md-add-circle-outline" color={'#333647'} size={64} />
          </TouchableOpacity>
        </View>
        <Text style={{fontFamily: 'Raleway-Bold'}}>All Groups</Text>
        <Icon name="ios-people" color={'#000000'} size={24} />
      </View>
    );
  }
}

export default AllGroupsScreen;

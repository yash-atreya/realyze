/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import MainHeader from '../components/MainHeader';

class AllGroupsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {/* Main Screen Header */}
        <MainHeader mainHeaderTitle="Groups" />

        {/* New Group Add Button Icon */}
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

      </View>
    );
  }
}

export default AllGroupsScreen;

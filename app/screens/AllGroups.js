import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

//Custom Components
import {styles, textInput, buttonStyles} from '../../styles';

//3rd Party Libraries
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
        {/* New Group Modal */}
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

        {/* Main Screen */}
        <View>
          <View
            style={{
              marginBottom: hp('2%'),
              marginTop: hp('0.7%'),
              marginLeft: wp('5.6%'),
            }}>
            <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>
              Groups
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AllGroupsScreen;

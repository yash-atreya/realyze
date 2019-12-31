import React, {Component} from 'react';
import {View, Text} from 'react-native';

//Custom Components
import {styles, textInput, buttonStyles} from '../../styles';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

class AllNotificationsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {/* Main Screen */}
        <View>
          <View
            style={{
              marginBottom: hp('2%'),
              marginTop: hp('0.7%'),
              marginLeft: wp('5.6%'),
            }}>
            <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>
              Notifications
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AllNotificationsScreen;

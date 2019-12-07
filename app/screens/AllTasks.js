import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, SafeAreaView} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class AllTasksScreen extends Component {
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
            marginBottom: hp('9.85%'),
            zIndex: 10,
            shadowcolor: '#00000029',
            shadowRadius: 6,
          }}>
          <TouchableOpacity onPress={this.toggleModal}>
            <Icon name="ios-add-circle" color={'#333647'} size={64} />
          </TouchableOpacity>
        </View>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
          <Text style={{fontFamily: 'Raleway-Bold'}}>All Tasks</Text>
        </LinearGradient>
        <FontAwesome5 name="list-ul" color={'#000000'} size={24} />
      </View>
    );
  }
}

export default AllTasksScreen;

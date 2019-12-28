import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

class ViewInsightsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Button
          title="Go Back to Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Text style={{fontFamily: 'Raleway-Bold'}}>View Insights</Text>
        <Icon name="ios-people" color={'#000000'} size={24} />
      </View>
    );
  }
}

export default ViewInsightsScreen;

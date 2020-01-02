/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
// import PrimaryButton from '../components/PrimaryButton';
import SecondaryHeader from '../components/SecondaryHeader';

class ViewInsightsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <SecondaryHeader secondaryHeaderTitle="Insights" />
        <Text>Hello</Text>
      </View>
    );
  }
}

export default ViewInsightsScreen;

{
  /* <Button
  title="Go Back to Profile"
  onPress={() => this.props.navigation.navigate('Profile')}
/>
<Text style={{fontFamily: 'Raleway-Bold'}}>View Insights</Text>
<Icon name="ios-people" color={'#000000'} size={24} /> */
}
{/* <View
style={{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
}}>
<View
  style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
  <TouchableOpacity
    onPress={() => this.props.navigation.navigate('Profile')}>
    <Icon name="ios-arrow-back" size={34} color={'#000000'} />
  </TouchableOpacity>
</View>
<View
  style={{
    flex: 3,
    justifyContent: 'center',
  }}>
  <Text
    style={[
      styles.h1PSBB,
      {
        fontSize: 30,
        color: '#000000',
        justifyContent: 'center',
        alignSelf: 'center',
      },
    ]}>
    Insights
  </Text>
</View>
<View style={{flex: 1}} />
</View> */}
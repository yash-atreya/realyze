/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

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
import ProfileComponent from '../components/ProfileComponent';

class BuddyRequestsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <SecondaryHeader secondaryHeaderTitle="Requests" />
        <ScrollView>
          <ProfileComponent onPressUserProfile={()=> this.props.navigation.navigate('UserProfile')}/>
          <ProfileComponent onPressUserProfile={()=> this.props.navigation.navigate('UserProfile')}/>
          <ProfileComponent onPressUserProfile={()=> this.props.navigation.navigate('UserProfile')}/>
        </ScrollView>
      </View>
    );
  }
}

export default BuddyRequestsScreen;

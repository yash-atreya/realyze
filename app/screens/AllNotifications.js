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
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

//Custom Components
import MainHeader from '../components/MainHeader';
import PrimaryButton from '../components/PrimaryButton';
import IconTabComponent from '../components/IconTabComponent';

class AllNotificationsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {/* Main Screen Header */}
        <MainHeader mainHeaderTitle="Notifications" />
        <IconTabComponent
          tabTitle="Buddy Requests"
          Icon={<FeatherIcon name="user-plus" size={24} color={'#000000'} />}
          onPress={() => this.props.navigation.navigate('BuddyRequests')}
        />
        {/* <PrimaryButton title='BUDDY REQUESTS' onPress='BuddyRequests' /> */}
      </View>
    );
  }
}

export default AllNotificationsScreen;

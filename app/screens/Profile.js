import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

//Custom Components
import {styles, textInput, buttonStyles} from '../../styles';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal, {
  SlideAnimation,
  BottomModal,
  ModalContent,
} from 'react-native-modals';

//Cutom Screens

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    text: '',
  };
  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

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
              Profile
            </Text>
          </View>
        </View>
        <Button
          title="View Insights"
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        />
        <Button
          title="My Buddies"
          onPress={() => this.props.navigation.navigate('MyBuddies')}
        />
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button title="Edit Profile" onPress={this.toggleModal} />

        {/* Edit Profile Modal */}
        <BottomModal
          visible={this.state.visible}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {
            this.setState({visible: false});
          }}
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('91.2%')}
          modalStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#D5D7DB',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}
          onTouchOutside={() => {
            this.setState({visible: false});
          }}>
          <View>
            <Text>Edit Profile Modal</Text>
            <Button
              title="Save"
              onPress={() => {
                this.setState({visible: false});
              }}
            />
          </View>
        </BottomModal>
      </View>
    );
  }
}

export default ProfileScreen;

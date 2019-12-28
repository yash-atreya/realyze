import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

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

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    text: '',
  };
  async hideModal() {
    this.setState({visible: false});
  }
  render() {
    return (
      <View>
        <Button
          title="Go Back to Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Text style={{fontFamily: 'Raleway-Bold'}}>Settings</Text>
        <Icon name="ios-people" color={'#000000'} size={24} />
        <Button
          title="Terms and Conditions"
          onPress={() => this.props.navigation.navigate('TermsandConditions')}
        />
        <Button
          title="Log Out"
          onPress={() => {
            this.setState({visible: true});
            this.code = 'Log Out';
          }}
        />
        <Button
          title="Delete Account"
          onPress={() => {
            this.setState({visible: true});
            this.code = 'Delete your account';
          }}
        />
        <Modal
          visible={this.state.visible}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {
            this.setState({visible: false});
          }}
          onTouchOutside={() => {
            this.setState({visible: false});
          }}>
          <View>
            <Text>Are you sure you want to {this.code} </Text>
            <Button
              title="Yes"
              onPress={() => {
                // this.setState({visible: false});
                this.hideModal().then(() =>
                  this.props.navigation.navigate('Auth'),
                );
              }}
            />
            <Button
              title="No"
              onPress={() => {
                this.setState({visible: false});
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default SettingsScreen;

/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal, {
  SlideAnimation,
  BottomModal,
  ModalContent,
} from 'react-native-modals';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

//Custom Components
import Header2 from '../components/Header2';

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
        {/* Header */}
        <Header2 headerTitle="Settings" onPressBackButton="Profile" />

        <View style={{marginTop: hp('4.43%'), marginLeft: wp('7.73%')}}>
          <View>
            <View style={{height: 26}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('TermsandConditions')
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flex: 1,
                }}>
                <Icon
                  name="ios-book"
                  size={24}
                  color={'#000000'}
                  style={{flex: 1}}
                />
                <Text
                  style={[
                    styles.h1PMB,
                    {
                      fontSize: 20,
                      color: '#000000',
                      flex: 7,
                    },
                  ]}>
                  Terms and Conditions
                </Text>
                <Icon
                  name="ios-arrow-forward"
                  size={24}
                  color={'#000000'}
                  style={{flex: 1}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: hp('3.2%'), height: 26}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({visible: true});
                this.code = 'Log Out';
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flex: 1,
              }}>
              <Icon
                name="md-log-out"
                size={24}
                color={'#000000'}
                style={{flex: 1}}
              />
              <Text
                style={[
                  styles.h1PMB,
                  {
                    fontSize: 20,
                    color: '#000000',
                    flex: 7,
                  },
                ]}>
                Log Out
              </Text>
              <Icon
                name="ios-arrow-forward"
                size={24}
                color={'#000000'}
                style={{flex: 1}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: hp('3.2%'), height: 26}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({visible: true});
                this.code = 'Delete your account';
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flex: 1,
              }}>
              <Icon2
                name="delete"
                size={24}
                color={'#000000'}
                style={{flex: 1}}
              />
              <Text
                style={[
                  styles.h1PMB,
                  {
                    fontSize: 20,
                    color: '#000000',
                    flex: 7,
                  },
                ]}>
                Delete Account
              </Text>
              <Icon
                name="ios-arrow-forward"
                size={24}
                color={'#000000'}
                style={{flex: 1}}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Make Sure Modal */}
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
          <View style={{marginTop: 30}}>
            <Text
              style={[
                styles.bcRMB,
                {
                  fontSize: 16,
                  marginLeft: 30,
                  marginRight: 30,
                  marginBottom: 20,
                },
              ]}>
              Are you sure you want to {this.code}
              {''}?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginBottom: 30,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({visible: false});
                  this.hideModal().then(() =>
                    this.props.navigation.navigate('Auth'),
                  );
                }}>
                <Text style={[styles.bcRBB, {fontSize: 16, color: '#00A1ED'}]}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({visible: false});
                }}>
                <Text style={[styles.bcRBB, {fontSize: 16, color: '#00A1ED'}]}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SettingsScreen;

{
  /* <Button
  title="Go Back to Profile"
  onPress={() => this.props.navigation.navigate('Profile')}
  /> */
}
{
  /* <Button
  title="Log Out"
  onPress={() => {
    this.setState({visible: true});
    this.code = 'Log Out';
  }}
  /> */
}
{
  /* <Button
  title="Delete Account"
  onPress={() => {
    this.setState({visible: true});
    this.code = 'Delete your account';
  }}
  /> */
}
{
  /* <Button
  style={{backgroundColor: 'none'}}
  color={'#00A1ED'}
  title="Yes"
  onPress={() => {
    // this.setState({visible: false});
    this.hideModal().then(() =>
    this.props.navigation.navigate('Auth'),
    );
  }}
  /> */
}
{
  /* <Button
  color={'#00A1ED'}
  title="No"
  onPress={() => {
    this.setState({visible: false});
  }}
  /> */
}

  // <View
  //   style={{
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginLeft: wp('7.7%'),
  //   }}>
  //   <View>
  //     <TouchableOpacity
  //       onPress={() => this.props.navigation.navigate('Profile')}>
  //       <Icon name="ios-arrow-back" size={34} color={'#000000'} />
  //     </TouchableOpacity>
  //   </View>
  //   <View style={{marginLeft: wp('24%'), alignSelf: 'center'}}>
  //     <Text style={[styles.h1PSBB, {fontSize: 30, color: '#000000'}]}>
  //       Settings
  //     </Text>
  //   </View>
  // </View>
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles} from '../../styles';

//Custom Components
import BuddyHeader from '../components/BuddyHeader';
import IconTabComponent from '../components/IconTabComponent';
import PrimaryButton from '../components/PrimaryButton';

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);

  //=================STATE==============
    this.state = {
      isBuddy: false,
      isRequestSent: true,
    }
  }

  render() {
    return (
      <View>
        <BuddyHeader buddyUsername="yashatreya.ya" />
        {/* Setting ProfilePicture and Edit Profile */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: hp('1.6%'),
          }}>
          {/* ProfilePicture Icon 2/3 */}
          <View style={[stylesShape.CircleShapeView]} />
        </View>

        {/* Full name, Username, Buddies, Bio */}
        <View style={{flexDirection: 'row', backgroundColor:'none', marginBottom: hp('1%')}}>
          {/* Left Spacer 1/3 */}
          <View style={{flex: 0.5, backgroundColor: 'none'}} />

          {/* Middle Text Part 2/3 */}
          <View style={{flex:8, backgroundColor:'none'}}>
            {/* The color of this View component will only be seen if it is given a specific height */}
            {/* The Full name cell 1/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('2%')}}>
              <Text style={[styles.h1PMB, {fontSize: 20, color: '#000000', textAlign:'center'}]}>Yash Atreya</Text>
            </View>
            {/* Username cell name 2/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%')}}>
              <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]}>@yashatreya.ya</Text>
            </View>
            {/* Buddies and no of Buddies 3/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%'), alignItems:'flex-start'}}>
              {/* If aligning items is left to default (i.e nothing) then it causes the entire cell to be touchable opacity therefor we use flex-start to limit the react of the components */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MyBuddies')} style={{flexDirection: 'row'}}>
                <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]} >BUDDIES     </Text>
                <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left'}]}>0</Text>
              </TouchableOpacity>
            </View>

            {/* Bio cell 4/4 */}
            <View style={{backgroundColor:'none', marginBottom: hp('1.9%')}}>
              <Text style={[styles.bcRRB, {fontSize: 14, color: '#000000', textAlign:'left'}]}>I started doing this after reading Atomic Habits   </Text>
            </View>
          </View>
          {/* Right Spacer 3/3 */}
          <View style={{flex: 0.5, backgroundColor: 'none'}} />
        </View>
          {this.state.isBuddy ? (
            <>
          <IconTabComponent
          tabTitle="View Insights"
          Icon={<Icon name="ios-stats" size={24} color={'#000000'} />}
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        />
        <IconTabComponent
          tabTitle="Shared Tasks"
          Icon={<FontAwesome5Icon name="tasks" size={24} color={'#000000'} />}
          onPress={() => this.props.navigation.navigate('ViewInsights')}
        /> 
        </>) : (null)}
       
        <View style={{flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}} >
          {this.state.isRequestSent ? (
            <PrimaryButton title="Revoke Request" onPressPrimaryButton={() => console.log('Revoke Request')}/>
          ) : (
              <PrimaryButton title="Send Request" />
          )}
        </View>
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 228,
    height: 228,
    borderRadius: 228 / 2,
    borderWidth: 5,
    // borderColor: '#00A1ED',
    borderColor: '#56575D',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});

export default UserProfileScreen;

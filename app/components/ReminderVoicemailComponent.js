/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal, {BottomModal, SlideAnimation} from 'react-native-modals';

//Custom External StyleSheet
import {styles} from '../../styles';

//Custom Components


class ReminderVoicemail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View
            style={
            {flexDirection:'row',
            backgroundColor:'none',
            justifyContent:'space-around',
            position:"absolute",
            width:'100%',
            marginTop:  hp('80%')}}
        >
          <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}}>
            <FontAwesome5 name="exclamation" size={30} color="black" />
            <Text style={[styles.bcRBB, {fontSize:12}]}>remind</Text>
            {/* <Icon name="ios-checkmark-circle-outline" size={30} color="green" />
            <Text style={[styles.bcRBB, {fontSize:12}]}>sent</Text> */}
          </TouchableOpacity>

            <TouchableOpacity style={{alignItems:'center', justifyContent:'center'}}>
            <MaterialIcon name="voicemail" size={36} color="black" />
            <Text style={[styles.bcRBB, {fontSize:12}]}>voicemail</Text>
            {/* <FoundationIcon name="record" size={30} color="red" />
            <Text style={[styles.bcRBB, {fontSize:12}]}>record</Text> */}
            {/* <FontAwesome5 name="stop" size={30} color="red" />
            <Text style={[styles.bcRBB, {fontSize:12}]}>stop</Text> */}
            {/* <FontAwesomeIcon name="send" size={30} color="#00A1ED" />
            <Text style={[styles.bcRBB, {fontSize:12}]}>send</Text> */}
            {/* <Icon name="ios-checkmark-circle-outline" size={30} color="green" />
            <Text style={[styles.bcRBB, {fontSize:12}]}>sent</Text> */}
          </TouchableOpacity>
        </View>
    );
  }
}

export default ReminderVoicemail;

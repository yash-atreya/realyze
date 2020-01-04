/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  StyleSheet,
} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles} from '../../styles';

class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.headerTitle = this.props.headerTitle;
    this.onPressBackButton = this.props.onPressBackButton;
  }

  render() {
    return (
      // Main Container Greatest Parent
      <View style={{ flexDirection: 'row', backgroundColor: 'none', overflow: 'hidden', marginBottom: 12}}>
        {/* Left Manin  Spacer */}
        <View style={{flex: 0.5, backgroundColor: 'none'}} />
        {/* middle part of column main stack 1/3 */}
        <View style={{flex: 8, flexDirection: 'column'}}>
          
          {/* Task title of column main Stack */}
          <TouchableOpacity>
            <Text>
            <Text style={[styles.bcRBB, {fontSize: 12, color:'#000000'}]}>Task: </Text>  
            <Text style={[styles.bcRMB, {fontSize: 12, color:'#000000'}]}>This is the task cajnsjvnjand andjna sjnfd djnvajk</Text>
            </Text>
          </TouchableOpacity>

          {/* Spacer of column stack 2/3 */}
          <View style={{height: 4}} />
          
          {/* Profile Part of column stack 3/3 */}
          {/* if flex is added here then it will not work */}
          {/* Profile part 1/5 of row */}
          <View style={{flexDirection: 'row', backgroundColor: 'none'}}>
            <TouchableOpacity>
              <View style={[stylesShape.CircleShapeView]} />
            </TouchableOpacity>
            {/* left inner spacer 2/5 of row */}
            <View style={{flex: 0.1, backgroundColor: 'none'}} />
            <View
              style={{
                flex: 7,
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: 'none',
              }}>
            <Text>
              <Text style={[styles.bcRBB, {fontSize: 12, color:'#000000'}]}>dharmi_nk </Text>
              <Text style={[styles.bcRBB, {fontSize: 12, color:'#000000'}]}>says you need to complete this task.</Text>
            </Text>
            </View>
            {/* right inner spacer 4/5 for row */}
            <View style={{flex: 0.1, backgroundColor: 'none'}} />
            {/* icon part 5/5 for row */}
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'none',}}>
              <TouchableOpacity>
                <FontAwesomeIcon name="exclamation" size={30} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flex: 0.5, backgroundColor: 'none'}} />
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    borderWidth: 2,
    // borderColor: '#56575D',
    borderColor: '#00A1ED',
    shadowColor: '#00A1ED67',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 6,
  },
});

export default withNavigation(NotificationComponent);

//Voice Message then
// Text
{/* <Text style={[styles.bcRBB, {fontSize: 12, color:'#000000'}]}>send you a voice message.</Text> */}

//Play Icon
{/* <MaterialIcon name="play-circle-outline" size={30} color="#FF0000" /> */}
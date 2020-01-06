/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

//Custom External StyleSheet
// import {styles, textInput, buttonStyles} from '../../styles';
import {styles} from '../../styles';

class GroupComponent extends Component {
  constructor(props) {
    super(props);
    this.groupName = this.props.groupName;
    // this.onPress = this.props.onPress;
    this.onPress = this.props.onPress;
    this.groupIcon = this.props.groupIcon;
  }
  render() {
    return (
// Here the entire tab has touchable opacity

      // Biggest Parent Container
      <TouchableOpacity
        //   This commented component wont work because if i want to activate a modal then it can cause issue
        // onPress={() => this.props.navigation.navigate(`${this.onPressNextButton}`)}
        onPress={this.onPress}
        style={{
          marginBottom: 24,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: 'none',
        }}>
        {/* Left Main Tab Spacer 1/5 */}
        <View style={{flex: 0.5}} />

        {/* Icon space 2/5 */}
        {/* <View style={{flex: 1, backgroundColor: 'none', justifyContent:'center', alignItems:'flex-start'}}>
          {this.Icon}
        </View> */}
        {/* <View style={{backgroundColor: 'red', justifyContent:'center', alignItems:'flex-start'}}> */}
        <View style={{flex:2}}>
          <View style={[stylesShape.CircleShapeView, {justifyContent:'center', alignItems:'center'}]}>
            {this.groupIcon}
          </View>
        </View>

        {/* Text space 3/5 */}
        {/* The Children inside this tag given flex default of column therefore justifycontent and align items works in similar fashion of column layout design  */}
        <View style={{flex: 5, backgroundColor: 'none', justifyContent:'center', alignItems:'flex-start'}}>
          <Text style={[styles.bcRBB, {fontSize: 20, color: '#000000'}]}>{this.groupName}</Text>
        </View>
        
        {/* Next Icon space 4/5 */}
        <View style={{flex: 1, backgroundColor: 'none', justifyContent:'center',  alignItems:'flex-end'}}>
          <Icon name="ios-arrow-forward" size={24} color={'#000000'} />
        </View>
        {/* Right Main Tab Spacer 5/5 */}
        <View style={{flex: 0.5}} />
      </TouchableOpacity>
    );
  }
}
const stylesShape = StyleSheet.create({
    CircleShapeView: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      borderWidth: 3,
    //   borderColor: '#56575D',
      borderColor: '#00A1ED',
      shadowColor: '#00A1ED67',
      shadowOffset: {width: 0, height: 7},
      shadowRadius: 6,
    },
  });

export default withNavigation(GroupComponent);

// Icons : 

// Study : 
// <FontAwesome5Icon name="book" size={30} />

// Code : 
// <FontAwesomeIcon name="code" size={30} />

// Workout : 
// <Icon name="ios-fitness" size={40}/>

// Finance/Accounts :
// <FontAwesomeIcon name="money" size={30}/>

// Family/Meeting : 
// <FontAwesomeIcon name= "users" size={30}/>

// Blog/Write : 
// <FontAwesome5Icon name="blog" size={30}/>

// Work : 
// <FontAwesome5Icon name="business-time" size={30}/>

// Travel : 
// <FontAwesome5Icon name= "map-marked-alt" size={30}/>

// Shopping : 
// <FontAwesomeIcon name="shopping-cart" size={30}/>
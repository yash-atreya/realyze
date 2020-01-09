/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';
import {Svg, Circle} from 'react-native-svg';

class AllTasksComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onPressTask = this.props.onPressTask
  }
  render() {
    return (
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'none', marginBottom:24}}>
        <View style={{flex:0.5}} />

          <View style={{flex:8, flexDirection:'row',justifyContent:'center', alignItems:'center'}}>  
            <TouchableOpacity>
              <View style={[stylesShape.CircleShapeView]} />
            </TouchableOpacity>

            <View style={{flex:0.2}} />

            <View style={{flex:6}}>
              <TouchableOpacity onPress={this.onPressTask}>
                <Text numberOfLines={2}
                ellipsizeMode="tail"
                style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left', textDecorationLine:'none'}]}>
                  This is where the title will be ndk jadnnd dandsnvaou
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        <View style={{flex:0.5}} />
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    borderWidth: 3,
    borderColor: '#00A1ED',
    shadowRadius: 2,
    backgroundColor: 'transparent',
  },
});

export default withNavigation(AllTasksComponent);

// on Circle Press change
// 1) backgroundColor:'transparent' to backgroundColor: '#00A1ED',
// 2) textDecorationLine:'none' to textDecorationLine:'line-through',


{/* <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'none', marginBottom:24}}>
        <View style={{flex:0.5}} />

          <View style={{flex:8, flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
    
            <TouchableOpacity>
              <View style={[stylesShape.CircleShapeView]} />
            </TouchableOpacity>

            <View style={{flex:0.2}} />

            
            <TouchableOpacity style={{flex:6}} onPress={this.onPressTask}>
              <Text numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left', textDecorationLine:'none'}]}>
                This is where the title will be ndk jfba ncjkan asdjkasbk d cajknd sdnjan jadnnd
              </Text>
            </TouchableOpacity>
          
            <View style={{flex:0.1}} />
                     
            <TouchableOpacity style={{flex:1, alignItems:'center', backgroundColor:'none'}} onPress={this.onPressTask}>
              <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textDecorationLine:'none'}]}>
                WED
              </Text>
              <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textDecorationLine:'none'}]}>
                12th
              </Text>
            </TouchableOpacity>
            
          </View>

        <View style={{flex:0.5}} />
      </View> */}
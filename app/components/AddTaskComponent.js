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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';
import {Svg, Circle} from 'react-native-svg';

class AllTasksComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'none', marginBottom:24}}>
        <View style={{flex:0.5}} />

            <View style={{flex:8, flexDirection:'row',justifyContent:'center', alignItems:'center'}}>  

                {/* <TouchableOpacity> */}
                    <View style={[stylesShape.CircleShapeView]}>
                        <View style={[stylesShape.CircleShapeView2]} />
                    </View>
                {/* </TouchableOpacity> */}

                <View style={{flex:0.2}} />

                <View style={{flex:6}}>
                    <View onPress={this.onPressTask}>
                        <Text numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[styles.bcRSBB, {fontSize: 16, color: '#000000', textAlign:'left', textDecorationLine:'none'}]}>
                        This is where the title will be ndk jadnnd dandsnvaou
                        </Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity>
                        <MaterialIcon name="add-box" color="#000000" size={34} />
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
  CircleShapeView2: {
    width: 4,
    height: 4,
    borderRadius: 4 / 2,
    borderColor: '#00A1ED',
    backgroundColor: '#00A1ED',
  },
});

export default withNavigation(AllTasksComponent);

// If Task Added
// <MaterialIcon name="check-box" color="#000000" size={34} />
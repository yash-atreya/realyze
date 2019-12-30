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
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginLeft: wp('3%'),
        }}>
        <View style={stylesShape.CircleShapeView} />
        <View>
          <TouchableOpacity>
            <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000'}]}>
              Complete Your Maths Assignment
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000'}]}>
            WED
          </Text>
          <Text style={[styles.bcRSBB, {fontSize: 16, color: '#000000'}]}>
            12th
          </Text>
        </View>
      </View>
    );
  }
}
const stylesShape = StyleSheet.create({
  CircleShapeView: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: '#00A1ED',
    shadowRadius: 2,
  },
});

export default withNavigation(AllTasksComponent);

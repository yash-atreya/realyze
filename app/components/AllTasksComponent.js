import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//3rd Party Libraries
import {withNavigation} from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';
import {Svg, Circle} from 'react-native-svg';

class AllTasksComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity>
          <Svg height="100" width="100">
            <Circle cx="50" cy="50" r="50" fill="pink" />
          </Svg>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(AllTasksComponent);

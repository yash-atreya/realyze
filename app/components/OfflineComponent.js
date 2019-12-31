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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

class OfflineIndicator extends Component {
  constructor(props) {
    super(props);
    // this.state = {showText: true};
    // // Change the state every second or the time given by User.
    // setInterval(
    //   () => {
    //     this.setState(previousState => {
    //       return {showText: !previousState.showText};
    //     });
    //   },
    //   // Define blinking time in milliseconds
    //   1000,
    // );
  }

  render() {
    // let display = this.state.showText ? this.props.text : ' ';
    // if using the above commented method then make sure to pass text="" property inside the Offline Indicator Component where it is used
    // eg: <OfflineIndicator text="Offline" />
    //We didnt use the above commented method as it was showing a warning after shifting to the mainTab Stack
    return (
      <View
        style={{
          borderRadius: Platform.OS === 'ios' ? 5 : 2,
          backgroundColor: '#FF8686',
          width: 59,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.bcRRB,
            {
              fontSize: 12,
              color: '#000000',
            },
          ]}>
          OFFLINE
          {/* {display} */}
        </Text>
      </View>
    );
  }
}

export default OfflineIndicator;

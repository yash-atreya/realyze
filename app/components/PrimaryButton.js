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

class PrimaryButton extends React.Component {
  constructor(props) {
    super(props);
    this.title = this.props.title;
    this.code = this.props.navigation.getParam('code');
    this.onPress = this.props.onPress;
    this.navigation = this.props.navigation;
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(`${this.onPress}`)}
        style={{
          shadowColor: '#102FC6',
          shadowOpacity: 0.3,
          shadowOffset: {width: 0, height: 7},
          shadowRadius: 11,
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#00A1ED', '#0A3BC6']}
          style={buttonStyles.buttonBody}>
          {this.code === 1 ? (
            <Text style={[styles.h1PBW, {fontSize: 20}]}>{this.title}</Text>
          ) : (
            <Text style={[styles.h1PBW, {fontSize: 24}]}>{this.title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(PrimaryButton);

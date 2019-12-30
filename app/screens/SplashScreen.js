import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Logo from '../components/Svg Components/Logo';

//Custom External StyleSheet
import {styles, textInput, buttonStyles} from '../../styles';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // When mounted, wait one second, then navigate to App
    setTimeout(() => {
      // Components that are placed inside a React Navigation
      // navigator will receive the `navigation` prop.
      // It's main usage is to trigger navigation events.
      // Right here we're telling it to navigate to the route
      // with the name 'App'.
      this.props.navigation.navigate('LogIn');
    }, 1000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E9EBF1',
        }}>
        {/* //width={wp('33.86')} height={hp('26.6')}  */}
        <Logo scale={0.2} />
        <Text style={[styles.h1PBB, {fontSize: 50}]}>REALYZE</Text>
        {/* <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('LogIn')}
        /> */}
      </View>
    );
  }
}

export default SplashScreen;

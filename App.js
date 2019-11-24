import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//SCREEN IMPORTS
import LogInScreen from './app/screens/LogIn';
import SignUpScreen from './app/screens/SignUp';
import ProfileScreen from './app/screens/Profile';
import ReAuthScreen from './app/screens/ReAuth';

// const AuthLoadingScreen = props => {
//   function checkUser() {
//     var user = firebase.auth().currentUser;

//     props.navigation.navigate(user ? 'Main' : 'Auth');
//   }
//   checkUser();

//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>Loading...</Text>
//     </View>
//   );
// };

const AuthStack = createStackNavigator(
  {
    LogIn: {
      screen: LogInScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    initialRouteName: 'LogIn',
  },
);

const MainStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  ReAuth: {
    screen: ReAuthScreen,
  },
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoad: AuthLoadingScreen,
      Auth: AuthStack,
      Main: MainStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default AppContainer;

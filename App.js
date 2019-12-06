/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Importing Libraries
import React, {Component} from 'react';
import {View, Text, StatusBar, Platform, SafeAreaView} from 'react-native';

//React-Navigation Libraries
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

//React-Native Libraries for Designing
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//Importing Screens
import SplashScreen from './app/screens/SplashScreen';
import LogInScreen from './app/screens/LogIn';
import AllGroupsScreen from './app/screens/AllGroups';
import AllTasksScreen from './app/screens/AllTasks';
import AllNotificationsScreen from './app/screens/AllNotifications';

// const App: () => React$Node = () => {
//   return <View />;
// };
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}
const SplashStack = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    },
  },
});
const AuthStack = createStackNavigator({
  LogIn: {
    screen: LogInScreen,
    navigationOptions: {
      header: null,
    },
  },
});
const MainStack = createMaterialTopTabNavigator(
  {
    AllTasks: {
      screen: AllTasksScreen,
      navigationOptions: {
        tabBarLabel: 'Tasks',
        tabBarIcon: ({tintColor}) => (
          <FontAwesome5 name="list-ul" color={tintColor} size={24} />
        ),
      },
    },
    AllGroups: {
      screen: AllGroupsScreen,
      title: 'Groups',
      navigationOptions: {
        tabBarLabel: 'Groups',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-people" color={tintColor} size={24} />
        ),
      },
    },
    AllNotifications: {
      screen: AllNotificationsScreen,
      title: 'Notifications',
      navigationOptions: {
        tabBarLabel: 'Notifications',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-notifications" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    //Router  Config
    initialRouteName: 'AllTasks',
    shifting: true,
    order: ['AllGroups', 'AllTasks', 'AllNotifications'],
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#00A1ED',
      inactiveTintColor: '#333647',
      showIcon: true,
      showLabel: false,
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Raleway-Bold',
      },
      style: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#00A1ED',
        //paddingBottom: Platform.OS === 'ios' ? hp('1.3') : hp('0'),
      },
      indicatorStyle: {
        height: 0,
      },
    },
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoad: SplashStack,
      Auth: AuthStack,
      Main: MainStack,
    },
    {
      initialRouteName: 'AuthLoad',
    },
  ),
);
// const styles = StyleSheet.create({});

export default App;

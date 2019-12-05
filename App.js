/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Importing Libraries
import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Importing Screens
import SplashScreen from './app/screens/SplashScreen';
import LogInScreen from './app/screens/LogIn';

// const App: () => React$Node = () => {
//   return <View />;
// };
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

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoad: SplashStack,
      Auth: AuthStack,
      // Main: MainStack,
    },
    {
      initialRouteName: 'AuthLoad',
    },
  ),
);
// const styles = StyleSheet.create({});

export default AppContainer;

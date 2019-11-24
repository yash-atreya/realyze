import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import auth from '@react-native-firebase/auth';

//SCREEN IMPORTS
import LogInScreen from './app/screens/LogIn';
import SignUpScreen from './app/screens/SignUp';
import ProfileScreen from './app/screens/Profile';
import ReAuthScreen from './app/screens/ReAuth';
import EditProfileScreen from './app/screens/EditProfile';
import HomeScreen from './app/screens/Home';
import CreateTaskScreen from './app/screens/CreateTask';
import AllTasksScreen from './app/screens/AllTasks';
import AddFriendsScreen from './app/screens/AddFriends';
import AllFriendsScreen from './app/screens/AllFriends';
import UserProfileScreen from './app/screens/UserProfile';

const AuthLoadingScreen = props => {
  function checkUser() {
    var user = auth().currentUser;

    props.navigation.navigate(user ? 'Main' : 'Auth');
  }
  checkUser();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );
};

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

const MainStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    ReAuth: {
      screen: ReAuthScreen,
    },
    EditProfile: {
      screen: EditProfileScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    CreateTask: {
      screen: CreateTaskScreen,
    },
    AllTasks: {
      screen: AllTasksScreen,
    },
    AddFriends: {
      screen: AddFriendsScreen,
    },
    AllFriends: {
      screen: AllFriendsScreen,
    },
    UserProfile: {
      screen: UserProfileScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoad: AuthLoadingScreen,
      Auth: AuthStack,
      Main: MainStack,
    },
    {
      initialRouteName: 'AuthLoad',
    },
  ),
);

export default AppContainer;

import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

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
import FriendRequestsScreen from './app/screens/FriendRequests';
import CreateGroupScreen from './app/screens/CreateGroup';
import AddMembersScreen from './app/screens/AddMembers';
import AllGroupsScreen from './app/screens/AllGroups';
import GroupScreen from './app/screens/Group';
import EditGroupScreen from './app/screens/EditGroup';
import TaskScreen from './app/screens/Task';
import SelectGroupsScreen from './app/screens/SelectGroups';
import AddBuddyToTaskScreen from './app/screens/AddBuddyToTask';
import EditTaskScreen from './app/screens/EditTask';
import TestScreen from './app/screens/Test';
import ReminderTestScreen from './app/screens/ReminderTest';

const requestPermission = async () => {
  try {
    const hasPermission = await messaging().hasPermission();
    if (hasPermission) {
      console.log('hasPermission');
    } else {
      try {
        await messaging()
          .requestPermission()
          .then(() => {
            console.log('permission granted');
          });
      } catch {
        console.log('err granting permission');
      }
    }
  } catch {
    console.log('user denied permission');
  }
};
const registerNotif = async () => {
  try {
    if (messaging().isRegisteredForRemoteNotifications) {
      await messaging()
        .registerForRemoteNotifications()
        .then(() => console.log('registered'));
    }
  } catch {
    console.log('error registering for notifications');
  }
};
const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  } catch {
    console.log('error getting token');
  }
};

registerNotif().then(() => requestPermission());

const listenForTokenRefresh = () => {
  console.log('listening for token refresh');
  messaging().onTokenRefresh(async newToken => {
    console.log('newToken: ', newToken);
    const uid = auth().currentUser.uid || null;
    if (uid != null) {
      await firestore()
        .collection('Users')
        .doc(`${uid}`)
        .update({
          fcmTokens: {
            [newToken]: true,
          },
        })
        .then(() => console.log('token refreshed and updated'))
        .catch(err => console.log('err updating to db ', err));
    }
  });
};

listenForTokenRefresh();
//=================================================================================//
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
    FriendRequests: {
      screen: FriendRequestsScreen,
    },
    CreateGroup: {
      screen: CreateGroupScreen,
    },
    AddMembers: {
      screen: AddMembersScreen,
    },
    AllGroups: {
      screen: AllGroupsScreen,
    },
    Group: {
      screen: GroupScreen,
    },
    EditGroup: {
      screen: EditGroupScreen,
    },
    Task: {
      screen: TaskScreen,
    },
    SelectGroups: {
      screen: SelectGroupsScreen,
    },
    AddBuddyToTask: {
      screen: AddBuddyToTaskScreen,
    },
    EditTask: {
      screen: EditTaskScreen,
    },
    Test: {
      screen: TestScreen,
    },
    ReminderTest: {
      screen: ReminderTestScreen,
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

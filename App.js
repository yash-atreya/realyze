import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

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

registerNotif().then(() => {
  requestPermission();
});

const requestPermission = async () => {
  try {
    const hasPermission = await messaging().hasPermission();
    if (hasPermission) {
      getFcmToken().then(fcmToken => console.log('FCM TOKEN: ', fcmToken));
    } else {
      try {
        await messaging()
          .requestPermission()
          .then(() => {
            console.log('permission granted');
            getFcmToken().then(fcmToken =>
              console.log('FCM TOKEN: ', fcmToken),
            );
          });
      } catch {
        console.log('err granting permission');
      }
    }
  } catch {
    console.log('user denied permission');
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

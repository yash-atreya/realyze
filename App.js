import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import dynamicLinks from '@react-native-firebase/dynamic-links';

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
import UserTasksScreen from './app/screens/UserTasks';
import ProfileDownloadScreen from './app/screens/ProfileDownload';
import AuthScreen from './app/screens/Auth';
import AsyncStorage from '@react-native-community/async-storage';

firestore.CACHE_SIZE_UNLIMITED;
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

const handleLink = async link => {
  console.log('opened Link: ', link.url);
  if (auth().isSignInWithEmailLink(link.url)) {
    console.log('link is tru');
    try {
      const email = await AsyncStorage.getItem('email');
      console.log('email: ', email);
      await auth()
        .signInWithEmailLink(`${email}`, link.url)
        .then(() => {
          console.log('USer created');
        })
        .catch(err => {
          console.log('EROR: ', err);
        });
    } catch (err) {
      console.log('err: ', err);
    }
  } else {
    console.log('link is false');
  }
};

const link = dynamicLinks().onLink(handleLink);

const AuthStack = createStackNavigator(
  {
    LogIn: {
      screen: LogInScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    initialRouteName: 'Auth',
  },
);

const MainStack = createStackNavigator(
  {
    ProfileDownload: {
      screen: ProfileDownloadScreen,
    },
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
    UserTasks: {
      screen: UserTasksScreen,
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

//3rd Party Libraries--------------------------------------
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
//------------------------------------------------------------

//Importing Screens
import SplashScreen from './app/screens/SplashScreen';
import LogInScreen from './app/screens/LogIn';
import AllGroupsScreen from './app/screens/AllGroups';
import AllTasksScreen from './app/screens/AllTasks';
import AllNotificationsScreen from './app/screens/AllNotifications';
import BuddyRequestsScreen from './app/screens/BuddyRequests';
import ProfileScreen from './app/screens/Profile';
import ViewInsightsScreen from './app/screens/ViewInsights';
import MyBuddiesScreen from './app/screens/MyBuddies';
import SettingsScreen from './app/screens/Settings';
import TermsandConditionsScreen from './app/screens/TermsandConditions';
import UsernameScreen from './app/screens/Username';

import StrangerBuddyScreen from './app/screens/StrangerBuddy';

// const App: () => React$Node = () => {
//   return <View />;
// };
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#E9EBF1'}}>
        <StatusBar backgroundColor="#E9EBF1" barStyle="dark-content" />
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
  Username: {
    screen: UsernameScreen,
    navigationOptions: {
      header: null,
    },
  },
});
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    ViewInsights: {
      screen: ViewInsightsScreen,
      navigationOptions: {
        header: null,
      },
    },
    MyBuddies: {
      screen: MyBuddiesScreen,
      navigationOptions: {
        header: null,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null,
      },
    },
    TermsandConditions: {
      screen: TermsandConditionsScreen,
      navigationOptions: {
        header: null,
      },
    },
    // EditProfile: {
    //   screen: EditProfileScreen,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
  },
  {
    cardStyle: {
      backgroundColor: '#E9EBF1',
    },
  },
);
ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({tintColor}) => (
    <Icon name="md-person" color={tintColor} size={24} />
  ),
};

const NotificationsStack = createStackNavigator(
  {
    AllNotifications: {
      screen: AllNotificationsScreen,
      navigationOptions: {
        header: null,
      },
    },
    BuddyRequests: {
      screen: BuddyRequestsScreen,
      navigationOptions: {
        header: null,
      },
    },
    StrangerBuddy: {
      screen: StrangerBuddyScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    cardStyle: {
      backgroundColor: '#E9EBF1',
    },
  },
);
NotificationsStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({tintColor}) => (
    <Icon name="ios-notifications" color={tintColor} size={24} />
  ),
}
const MainTabStack = createMaterialTopTabNavigator(
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
    NotificationsStack,
    // AllNotifications: {
    //   screen: AllNotificationsScreen,
    //   title: 'Notifications',
    //   navigationOptions: {
    //     tabBarLabel: 'Notifications',
    //     tabBarIcon: ({tintColor}) => (
    //       <Icon name="ios-notifications" color={tintColor} size={24} />
    //     ),
    //   },
    // },
    ProfileStack,
    // Profile: {
    //   screen: ProfileScreen,
    //   title: 'Profile',
    //   navigationOptions: {
    //     tabBarLabel: 'Profile',
    //     tabBarIcon: ({tintColor}) => (
    //       <Icon name="md-person" color={tintColor} size={24} />
    //     ),
    //   },
    // },
  },
  {
    //Router  Config
    initialRouteName: 'AllTasks',
    shifting: true,
    order: ['AllGroups', 'AllTasks', 'NotificationsStack', 'ProfileStack'],
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
        backgroundColor: '#E9EBF1',
        shadowColor: '#00A1ED',
        //paddingBottom: Platform.OS === 'ios' ? hp('1.3') : hp('0'),
      },
      indicatorStyle: {
        height: 0,
      },
    },
  },
);
MainTabStack.navigationOptions = {
  header: null,
};

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoad: SplashStack,
      Auth: AuthStack,
      Main: MainTabStack,
    },
    {
      initialRouteName: 'AuthLoad',
    },
  ),
);
// const styles = StyleSheet.create({});

export default App;

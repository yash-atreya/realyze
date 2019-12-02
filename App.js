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

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

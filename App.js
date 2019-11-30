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

// checkUser();
const saveTokenToDb = token => {
  const uid = auth().currentUser.uid;
  console.log('saveTokenToDb');
  firestore()
    .collection('Users')
    .doc(`${uid}`)
    .set({
      deviceToken: token,
    })
    .then(() => console.log('token saved to db'))
    .catch(err => console.log('unable to save token : ', err));
};
const requestPermission = async () => {
  try {
    const hasPermission = await messaging().hasPermission();
    if (hasPermission) {
      console.log('hasPermission');
      getFcmToken().then(fcmToken => {
        console.log(' hasPermission FCM TOKEN: ', fcmToken);
        saveTokenToDb(fcmToken);
      });
    } else {
      try {
        await messaging()
          .requestPermission()
          .then(() => {
            console.log('permission granted');
            getFcmToken().then(fcmToken => {
              console.log('FCM TOKEN: ', fcmToken);
              saveTokenToDb(fcmToken);
            });
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
// const pushToken = token => {
//   const uid = auth().currentUser.uid;
//   const docRef = firestore()
//     .collection('DeviceTokens')
//     .doc(`${uid}`);
//   var tempTokens = [];
//   firestore().runTransaction(async transaction => {
//     return await transaction
//       .get(docRef)
//       .then(doc => {
//         tempTokens.push(doc.data().tokens);
//       })
//       .then(() => {
//         tempTokens.push(token);
//         console.log('PUSHED NEW TOKEN');
//       })
//       .then(() => {
//         docRef
//           .update({
//             tokens: tempTokens,
//           })
//           .then(() => console.log('db updated'))
//           .catch(err => console.log('error updating db', err));
//       })
//       .catch(err => console.log('error pushing token to db: ', err));
//   });
// };
const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  } catch {
    console.log('error getting token');
  }
};
// const checkToken = async tokens => {
//   var tokensArray = [];
//   tokensArray = tokens;
//   var tokenExists = false;
//   try {
//     await getFcmToken()
//       .then(token => {
//         for (var i = 0; i < tokensArray.length; i++) {
//           if (tokens[i] === token) {
//             console.log('token already exists');
//             tokenExists = true;
//             break;
//           }
//         }
//         return token;
//       })
//       .then(token => {
//         if (tokenExists === false) {
//           pushToken(token);
//         }
//       });
//   } catch {
//     console.log('error');
//   }
// };
// const checkIfToken = () => {
//   console.log('checkIfToken()');
//   const uid = auth().currentUser.uid;
//   firestore()
//     .collection('DeviceTokens')
//     .doc(`${uid}`)
//     .get()
//     .then(doc => {
//       if (doc.exists) {
//         console.log('existing tokens: ', doc.data().tokens);
//         checkToken(doc.data().tokens);
//       } else {
//         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
//         registerNotif().then(() => {
//           requestPermission();
//         });
//       }
//     });
// };

// const checkUser = () => {
//   var userExists = Boolean;
//   if (auth().currentUser !== null) {
//     console.log('checkUser if()');
//     checkIfToken();
//   } else if (auth().currentUser === null || undefined) {
//     console.log('checkUser else');
//     return null;
//   }
// };
// checkUser();
//Check whether token already exists
if (auth().currentUser === null) {
  console.log('nefjnvorfv');
} else {
  registerNotif().then(() => requestPermission()).then(() => notify())
}

const notify = functions()
  .httpsCallable('notify')({
    title: 'TESTSTSTTSTSTS',
    uid: null || auth().currentUser.uid,
    message: 'what are you doing?',
  })
  .then(console.log('notified'))
  .catch(err => console.log('err'));

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

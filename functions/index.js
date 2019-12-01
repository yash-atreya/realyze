const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });

//======================ACCEPT REQUEST==========================//
exports.onAcceptRequest = functions.https.onCall((data, context) => {
  const targetId = data.targetId;
  const senderId = data.senderId;
  var targetUsername = '';
  return admin
    .firestore()
    .collection('Friendships')
    .doc()
    .set({
      targetId: targetId,
      senderId: senderId,
      timeStamp: new Date(),
    })
    .then(() => {
      console.log('Befriended');
      targetUsername = fetchTargetId(targetId);
      return targetUsername;
    })
    .then(username => {
      notifySenderId(senderId, username);
      return null;
    })
    .catch(err => console.log('errrrrr', err));
});
function fetchTargetId(targetId) {
  return admin
    .firestore()
    .collection('Users')
    .doc(`${targetId}`)
    .get()
    .then(doc => {
      return doc.data().username;
    })
    .catch(err => console.log('err retreiving targets username', err));
}
function notifySenderId(senderId, targetUsername) {
  return admin
    .firestore()
    .collection('Users')
    .doc(`${senderId}`)
    .get()
    .then(doc => {
      var tokens = Object.keys(doc.data().fcmTokens);
      console.log('TOKENS: ', tokens);
      return tokens;
    })
    .then(tokens => {
      console.log('tokens: ', tokens);
      const payload = {
        notification: {
          title: `${targetUsername} has accepted your friend request`,
          body: 'You can now add them to group',
          sound: 'default',
        },
      };
      return admin.messaging().sendToDevice(tokens, payload);
    })
    .then(() => console.log('notified senderId of Acceptance'))
    .catch(err => console.log('err notifying senderId', err));
}
//======================SEND REQUEST==========================// = 4.3s
exports.sendRequest = functions.https.onCall((data, context) => {
  const senderId = data.senderId;
  const targetId = data.targetId;
  const status = data.status;
  return admin
    .firestore()
    .collection('Requests')
    .add({
      senderId: senderId,
      targetId: targetId,
      status: 'sent',
      timeStamp: new Date(),
    })
    .then(() => {
      console.log('Request Sent');
      return null;
      //Send NOTIFICATION TO RECEIVER(targetId)
    })
    .catch(err => console.log('Error sending request - cloud function', err));
});

//======================NOTIFY ADDED MEMBERS==========================//

exports.notifyAddedMembers = functions.https.onCall((data, context) => {
  const members = data.members;
  members.forEach(member => {
    //send notifications to member.uid
  });
  return null;
});

//======================NOTIFY MEMBERS OF LEAVING GROUP==========================// = 4s

exports.notifyLeftGroup = functions.https.onCall((data, context) => {
  const groupId = data.groupId;
  const uid = data.uid;
  return admin
    .firestore()
    .collection('Groups')
    .doc(`${groupId}`)
    .collection('Members')
    .get()
    .then(doc => {
      doc.forEach(snap => {
        console.log(snap.data().uid); //uid
        console.log(snap.data().username); //Check if username exists in Members collection, if not, then add it.
        //Send notification FCM
      });
      return null;
    })
    .catch(err => console.log(err));
});

//======================NOTIFY MEMBERS OF TASK COMPLETION==========================//

exports.notifyTaskCompleted = functions.https.onCall((data, context) => {
  const taskId = data.taskId;
  const uid = data.uid;
  const groups = [];
  return admin
    .firestore()
    .collection('Tasks')
    .doc(`${taskId}`)
    .collection('TaskGroups')
    .get()
    .then(doc => {
      doc.forEach(snap => {
        console.log(snap.id);
        groups.push(snap.id);
      });
      return null;
    })
    .then(() => fcmTaskCompletion(groups))
    .catch(err => console.log(err));
});

function fcmTaskCompletion(groups) {
  //Check scope of groups array from parent function
  groups.forEach(group => {
    return admin
      .firestore()
      .collection('Groups')
      .doc(`${group}`)
      .collection('Members')
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log(snap.data().uid); //uid
          console.log(snap.data().username); //Check if username exists in Members collection, if not, then add it.
          //Send notification FCM
        });
        return null;
      })
      .catch(err => console.log(err));
  });
}
// Prevent sending doubly nofications to if a user exists in two groups and the task also exists in the same group.

//======================NOTIFY MEMBERS OF UNMARKING TASK==========================//

exports.notifyUnmarkedTask = functions.https.onCall((data, context) => {
  const taskId = data.taskId;
  const uid = data.uid;
  // const title =
  const groups = [];
  return admin
    .firestore()
    .collection('Tasks')
    .doc(`${taskId}`)
    .collection('TaskGroups')
    .get()
    .then(doc => {
      doc.forEach(snap => {
        console.log(snap.id);
        groups.push(snap.id);
      });
      return null;
    })
    .then(() => fcmUnmarkedTask());
});

function fcmUnmarkedTask() {
  //Check scope of groups array from parent function
  groups.forEach(group => {
    return admin
      .firestore()
      .collection('Groups')
      .doc(`${group}`)
      .collection('Members')
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log(snap.data().uid); //uid
          console.log(snap.data().username); //Check if username exists in Members collection, if not, then add it.
          //Send notification FCM
        });
        return null;
      })
      .catch(err => console.log(err));
  });
}

//======================ADD NEW TASK TO GROUP==========================//
exports.newTaskAdded = functions.https.onCall((data, context) => {
  //Retrieve groups array
  //Run forEach
  //notify each user except one
  const groups = data.groups;
  groups.forEach(doc => {
    return admin
      .firestore()
      .collection('Groups')
      .doc(`${doc.groupId}`)
      .collection('Members')
      .get()
      .then(doc => {
        doc.forEach(snap => {
          console.log(snap.id);
          //Send NOTIFICATION to snap.id(userId)
        });
        return null;
      })
      .catch(err =>
        console.log('cloud function error - newTaskAdded(): ', err),
      );
  });
});

//======================NOTIFY BUDDY ADDED==========================//

exports.notifyBuddyAdded = functions.https.onCall((data, context) => {
  const buddyUid = data.buddyUid;
  const buddyUsername = data.buddyUsername;
  //Add taskTitle, taskAuthor for sending notification
  //Send fcm
});

//======================TEST FUNCTION=====================//
exports.notify = functions.https.onCall((data, context) => {
  const uid = data.uid;
  const title = data.title;
  const message = data.message;
  var userTokens = [];
  return admin
    .firestore()
    .collection('Users')
    .doc(`${uid}`)
    .get()
    .then(doc => {
      var token = doc.data().deviceToken;

      var payload = {
        notification: {
          title: title,
          body: message,
          sound: 'default',
        },
      };

      return admin.messaging().sendToDevice(token, payload);
    });
});

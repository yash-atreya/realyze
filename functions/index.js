/* eslint-disable no-await-in-loop */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
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
  var senderUsername = '';
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
      senderUsername = fetchSenderId(senderId);
      return senderUsername;
    })
    .then(username => {
      console.log('senderUsername : ', username);
      notifyTargetId(targetId, username);
      return null;
    })
    .catch(err => console.log('Error sending request - cloud function', err));
});
function fetchSenderId(senderId) {
  return admin
    .firestore()
    .collection('Users')
    .doc(`${senderId}`)
    .get()
    .then(doc => {
      return doc.data().username;
    })
    .catch(err => console.log('err retreiving senders username', err));
}
function notifyTargetId(targetId, senderUsername) {
  return admin
    .firestore()
    .collection('Users')
    .doc(`${targetId}`)
    .get()
    .then(doc => {
      console.log(doc.data());
      var tokens = Object.keys(doc.data().fcmTokens);
      console.log('targetId tokens : ', tokens);
      return tokens;
    })
    .then(tokens => {
      const payload = {
        notification: {
          title: `${senderUsername} has sent you a friend request`,
          body: 'If you know them, accept it1',
          sound: 'default',
        },
      };

      return admin.messaging().sendToDevice(tokens, payload);
    })
    .then(() => console.log('notified target'))
    .catch(err => console.log('err notifying target', err));
}

//======================NOTIFY ADDED MEMBERS==========================//

exports.notifyAddedMembers = functions.https.onCall(async (data, context) => {
  try {
    const members = data.members;
    const groupName = data.groupName;

    const promises = [];
    members.forEach(member => {
      promises.push(
        admin
          .firestore()
          .collection('Users')
          .doc(`${member.uid}`)
          .get(),
      );
    });

    console.log('Promises array: ', promises);
    const tokensSnapshotsArray = await Promise.all(promises);
    console.log('tokensSnapshots: ', tokensSnapshotsArray);
    const promises1 = [];
    tokensSnapshotsArray.forEach(snap => {
      console.log(snap.data());
      const token = Object.keys(snap.data().fcmTokens); //Here you may adapt as it seems you have an array of tokens. I let you write the loop, etc.
      console.log('TOKEN: ', token);
      const payload = {
        notification: {
          title: `You have been added to ${groupName}`,
          body: 'Share your tasks',
          sound: 'default',
        },
      };
      promises1.push(admin.messaging().sendToDevice(token, payload));
    });

    await Promise.all(promises1);

    return {result: 'OK'};
  } catch (error) {
    console.log('error: ', error);
    //See the doc: https://firebase.google.com/docs/functions/callable#handle_errors
  }
  return null;
});
//======================NOTIFY MEMBERS OF LEAVING GROUP==========================// = 4s

exports.notifyLeftGroup = functions.https.onCall(async (data, context) => {
  const groupId = data.groupId;
  const username = data.username;
  const groupName = data.groupName;
  try {
    const promise = [];
    promise.push(
      admin
        .firestore()
        .collection('Groups')
        .doc(`${groupId}`)
        .collection('Members')
        .get(),
    );

    console.log('promises: ', promise);

    const memberSnapshots = await Promise.all(promise);

    console.log('memberSnaps: ', memberSnapshots);

    const uids = [];
    memberSnapshots.forEach(doc => {
      doc.forEach(snap => {
        console.log(snap.id);
        uids.push(snap.id);
      });
    });

    const tokenPromises = [];
    uids.forEach(uid => {
      tokenPromises.push(
        admin
          .firestore()
          .collection('Users')
          .doc(`${uid}`)
          .get(),
      );
    });

    console.log('tokenPromises: ', tokenPromises);
    const tokenSnapshots = await Promise.all(tokenPromises);

    const notifPromises = [];
    tokenSnapshots.forEach(snap => {
      console.log('userData: ', snap.data());
      const token = Object.keys(snap.data().fcmTokens);
      const payload = {
        notification: {
          title: `${username}`,
          body: `has left the group ${groupName}`,
          sound: 'default',
        },
      };
      notifPromises.push(admin.messaging().sendToDevice(token, payload));
    });

    await Promise.all(notifPromises);
  } catch (err) {
    console.log(err);
  }
  return {result: 'ok'};
});

//======================NOTIFY MEMBERS OF TASK COMPLETION==========================//

exports.notifyTaskCompleted = functions.https.onCall(async (data, context) => {
  const taskId = data.taskId;
  const uid = data.uid;
  const author = data.author;
  const taskTitle = data.taskTitle;
  try {
    const groups = await retrieveTaskGroups(taskId);
    for (const group of groups) {
      const members = await retrieveMembers(group.groupId);

      const memberPromises = [];
      members.forEach(member => {
        console.log('member: ', member);
        memberPromises.push(
          admin
            .firestore()
            .collection('Users')
            .doc(`${member}`)
            .get(),
        );
      });

      console.log('memberPromises: ', memberPromises);

      const memberSnapshots = await Promise.all(memberPromises);

      const notifPromises = [];
      memberSnapshots.forEach(snap => {
        console.log(snap.data());
        const token = Object.keys(snap.data().fcmTokens);
        const payload = {
          notification: {
            title: `${author} has completed: `,
            body: `Task: ${taskTitle}`,
            sound: 'default',
          },
        };

        notifPromises.push(admin.messaging().sendToDevice(token, payload));
      });
      await Promise.all(notifPromises);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
});

async function retrieveTaskGroups(taskId) {
  const groups = [];
  return await admin
    .firestore()
    .collection('Tasks')
    .doc(`${taskId}`)
    .collection('TaskGroups')
    .get()
    .then(doc => {
      doc.forEach(snap => {
        groups.push({
          groupId: snap.data().groupId,
          groupName: snap.data().groupName,
        });
      });
      return groups;
    });
}
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

exports.newTaskAdded = functions.https.onCall(async (data, context) => {
  const groups = data.groups;
  const uid = data.uid;
  const author = data.author;
  const taskId = data.taskId;
  const taskTitle = data.taskTitle;

  try {
    for (const group of groups) {
      const members = await retrieveMembers(group.groupId);

      const memberPromises = [];
      members.forEach(member => {
        console.log('member: ', member);
        memberPromises.push(
          admin
            .firestore()
            .collection('Users')
            .doc(`${member}`)
            .get(),
        );
      });

      console.log('memberPromises: ', memberPromises);

      const memberSnapshots = await Promise.all(memberPromises);

      const notifPromises = [];
      memberSnapshots.forEach(snap => {
        console.log(snap.data());
        const token = Object.keys(snap.data().fcmTokens);
        const payload = {
          notification: {
            title: `${author} added a new task to ${group.groupName}`,
            body: `Task: ${taskTitle}`,
            sound: 'default',
          },
        };

        notifPromises.push(admin.messaging().sendToDevice(token, payload));
      });
      await Promise.all(notifPromises);
    }
  } catch (err) {
    consoe.log(err);
  }
  console.log('DONE');
  return {result: 'OK'};
});

async function retrieveMembers(groupId) {
  var members = [];
  return await admin
    .firestore()
    .collection('Groups')
    .doc(`${groupId}`)
    .collection('Members')
    .get()
    .then(doc => {
      doc.forEach(snap => {
        console.log(snap.id);
        members.push(snap.id);
      });
      return members;
    });
}

//======================NOTIFY BUDDY ADDED==========================//

exports.notifyBuddyAdded = functions.https.onCall(async (data, context) => {
  const buddyUid = data.buddyUid;
  const author = data.author;
  const taskTitle = data.taskTitle;
  try {
    const promises = [];
    promises.push(
      admin
        .firestore()
        .collection('Users')
        .doc(`${buddyUid}`)
        .get(),
    );
    console.log('promises: ', promises);
    const buddySnapshot = await Promise.all(promises);
    console.log('buddySnapshot: ', buddySnapshot);
    const notifPromises = [];
    buddySnapshot.forEach(snap => {
      console.log('buddy Data: ', snap.data());
      const token = Object.keys(snap.data().fcmTokens);
      const payload = {
        notification: {
          title: `${author} has added you on their task as a buddy`,
          body: `Go help them complete ${taskTitle}`,
          sound: 'default',
        },
      };

      notifPromises.push(admin.messaging().sendToDevice(token, payload));
    });

    await Promise.all(notifPromises);
  } catch (err) {
    console.log('err', err);
  }
  return {result: 'ok'};
});

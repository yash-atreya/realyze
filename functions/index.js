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
      return null;
      //NOTIFICATION SENT TO uid2(senderId)
    })
    .catch(err => console.log('errrrrr', err));
});

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

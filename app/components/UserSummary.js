import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

const UserSummary = ({email, username, uid, navigation}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('UserProfile', {profileId: uid})}>
        <Text>{email}</Text>
        <Text>{username}</Text>
        <Text>{uid}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(UserSummary);
// withNavigation returns a component that wraps UserSummary and passes in the
// navigation prop
/*NOTES

*/

import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

const AllTasksComp = ({title, author, taskId, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Task', {taskId: taskId})}>
      <Text>{title}</Text>
      <Text>{author}</Text>
      <Text>{taskId}</Text>
    </TouchableOpacity>
  );
};

export default withNavigation(AllTasksComp);
/* NOTES
pass whatever needs to be displayed in the component from Tasks.js
*/

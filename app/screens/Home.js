import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

class HomeScreen extends Component {
  constructor() {
    super();
    console.log('HOME SCREEN');
  }
  static navigationOptions = {
    title: 'Home',
  };

  onSignOut() {
    auth().signOut();
    this.props.navigation.navigate('LogIn');
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title="Create Task"
          onPress={() => this.props.navigation.navigate('CreateTask')}
        />
        <Button
          title="Tasks"
          onPress={() => this.props.navigation.navigate('AllTasks')}
        />
        <Button
          title="Add Friends"
          onPress={() => this.props.navigation.navigate('AddFriends')}
        />
        <Button
          title="Friend Reqs"
          onPress={() => this.props.navigation.navigate('FriendRequests')}
        />
        <Button
          title="All Friends"
          onPress={() => this.props.navigation.navigate('AllFriends')}
        />
        <Button
          title="Create Group"
          onPress={() => this.props.navigation.navigate('CreateGroup')}
        />
        <Button
          title="All groups"
          onPress={() => this.props.navigation.navigate('AllGroups')}
        />
        <Button
          title="Test"
          onPress={() => this.props.navigation.navigate('NotifTest')}
        />
        <Button title="Sign out" onPress={() => this.onSignOut()} />
      </View>
    );
  }
}

export default HomeScreen;

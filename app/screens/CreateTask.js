import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from 'react-native-modal-datetime-picker';
import NetInfo from '@react-native-community/netinfo';
// import ColorPalette from 'react-native-color-palette';
import {Appearance} from 'react-native-appearance';

class CreateTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimePickerVisible: false,
      isDatePickerVisible: false,
      dueDate: '',
      dueTime: '',
      //   selectedColor: '',
      groups: [],
      title: '',
      isOnline: Boolean, //Add NetInfo @Yash
    };
    this.uid = auth().currentUser.uid;
    this.displayName = auth().currentUser.displayName;
  }

  onCreateTask() {
    //ADD RESTRICTION FOR FILLING ALL TextInputs @TANAY and show alert if not.
    //Possibly move to cloud functions as we might call this from this page and also select group page.
    const {title, desc, dueTime, dueDate} = this.state;
    console.log('Create Task Method ' + title + ' ' + desc);
    console.log('Due Time: ' + dueTime);
    var uid = auth().currentUser.uid;
    var displayName = auth().currentUser.displayName;

    var docRef = firestore()
      .collection('Tasks')
      .doc();
    firestore()
      .runTransaction(transaction => {
        return transaction
          .get(docRef)
          .then(doc => {
            transaction.set(docRef, {
              uid: uid,
              author: displayName,
              title: title,
              description: desc,
              dueTime: dueTime,
              dueDate: dueDate,
              createdOn: new Date(),
              status: 'pending',
            });
          })
          .then(() => console.log('task created'))
          .then(() => this.props.navigation.navigate('AllTasks'));
      })
      .catch(err => console.log('error', err)); // IF NO GRP IS SELECTED ??
  }
  //Time Picker Methods
  showTimePicker = () => {
    this.setState({isTimePickerVisible: true});
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };

  handleTimePicked = time => {
    this.setState({dueTime: time.toLocaleTimeString()});
    console.log('A time has been picked: ', time.toLocaleTimeString());
    this.hideTimePicker();
  };
  //Date Picker Methods
  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  handleDatePicked = date => {
    this.setState({dueDate: date.toDateString()});
    console.log('A date has been picked: ', date.toDateString());
    this.hideDatePicker();
  };
  render() {
    const colorScheme = Appearance.getColorScheme();
    console.log(colorScheme);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Create Task</Text>
        <TextInput
          onChangeText={title => this.setState({title: title})}
          placeholder="title"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />
        <TextInput
          onChangeText={desc => this.setState({desc: desc})}
          placeholder="Description"
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1}}
        />

        <Button title="Show Time Picker" onPress={this.showTimePicker} />
        <Text>Completion time: {this.state.dueTime}</Text>
        <Button title="Show Date Picker" onPress={this.showDatePicker} />
        <Text>Due Date: {this.state.dueDate}</Text>

        <Button title="Create Task" onPress={() => this.onCreateTask()} />

        <DateTimePicker
          mode="time"
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
          isDarkModeEnabled={colorScheme === 'dark'}
        />
        <DateTimePicker
          mode="date"
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
          isDarkModeEnabled={colorScheme === 'dark'}
        />
        {/* <ColorPalette
          onChange={color => (this.selectedColor = color)}
          value={this.selectedColor}
          colors={[
            '#C0392B',
            '#E74C3C',
            '#9B59B6',
            '#8E44AD',
            '#2980B9',
            '#350AD7',
          ]}
          title={'Controlled Color Palette:'}
          icon={<Text>✔</Text>}
          scaleToWindow={true}
        /> */}
        <Button
          title="Add to groups"
          onPress={() =>
            this.props.navigation.navigate('SelectGroups', {
              uid: this.uid,
              author: this.displayName,
              title: this.state.title,
              description: this.state.desc,
              dueTime: this.state.dueTime,
              dueDate: this.state.dueDate,
            })
          }
        />
        <Button
          title="Add Buddy"
          onPress={() =>
            this.props.navigation.navigate('AddBuddyToTask', {
              uid: this.uid,
              author: this.displayName,
              title: this.state.title,
              description: this.state.desc,
              dueTime: this.state.dueTime,
              dueDate: this.state.dueDate,
              code: 1,
            })
          }
        />
      </View>
    );
  }
}

export default CreateTaskScreen;
/* NOTES
Add Tag/Categories to create task
Solve warnings
Add navigation after successful task creation
*/

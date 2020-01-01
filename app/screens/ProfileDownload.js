import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage, {firebase} from '@react-native-firebase/storage';
import RNPermissions, {RESULTS} from 'react-native-permissions';
import auth from '@react-native-firebase/auth';

class ProfileDownloadScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: {
        uri: '',
      },
    };
  }

  async downloadImage() {
    const uid = auth().currentUser.uid;
    const downloadTo = `file://${
      firebase.utils.FilePath.DOCUMENT_DIRECTORY
    }/${uid}`;
    console.log('DownloadTo: ', downloadTo);
    console.log('Downloading...');
    await storage()
      .ref(`ProfilePictures/${uid}`)
      .writeToFile(downloadTo);
    console.log('...Downloaded');
    this.setState({
      image: {
        uri: downloadTo,
      },
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            resizeMode: 'contain',
          }}
          source={
            this.state.image || {uri: 'https://unsplash.com/photos/BuQ-jgeexaQ'}
          }
        />
        <Button title="Download Image" onPress={() => this.downloadImage()} />
      </View>
    );
  }
}

export default ProfileDownloadScreen;

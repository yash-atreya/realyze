import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  Button,
  TextInput,
  FlatList,
} from 'react-native';

//Custom Components
import PrimaryButton from '../components/PrimaryButton';
import {styles, textInput, buttonStyles} from '../../styles';

//3rd Party Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SlideAnimation, BottomModal, ModalContent} from 'react-native-modals';

class AllTasksScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    visible: false,
    text: '',
  };
  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

  passData() {
    const text = this.state.text;
    this.data.push({name: text});
    this.setState({visible: false});
  }

  data = [{name: 'Yash'}, {name: 'Dharmi'}];

  _renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <View
          style={{
            position: 'absolute',
            marginLeft: wp('81.3%'),
            marginTop: Platform.OS === 'ios' ? hp('79') : hp('80'),
            marginBottom: hp('9.85%'),
            zIndex: 10,
            shadowcolor: '#00000029',
            shadowRadius: 6,
          }}>
          <TouchableOpacity onPress={this.toggleModal}>
            <Icon name="ios-add-circle" color={'#333647'} size={64} />
          </TouchableOpacity>
        </View>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
          <Text style={{fontFamily: 'Raleway-Bold'}}>All Tasks</Text>
        </LinearGradient>
        <FontAwesome5 name="list-ul" color={'#000000'} size={24} />
        <FlatList
          data={this.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <BottomModal
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({visible: false});
          }}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={event => {
            this.setState({visible: false});
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          useNativeDriver={true}
          width={wp('100%')}
          height={hp('91.2%')}
          modalStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#D5D7DB',
          }}
          hasBackdrop={true}
          hideModalContentWhileAnimating={true}>
          {/* <ModalContent> */}
          <View>
            <Text>Hello</Text>
          </View>
          <TextInput
            placeholder="Hello"
            onChangeText={newtext => this.setState({text: newtext})}
          />
          {/* {console.log(this.state.text)} */}
          <TouchableOpacity
            onPress={() => this.passData()}
            style={{
              shadowColor: '#102FC6',
              shadowOpacity: 0.3,
              shadowOffset: {width: 0, height: 7},
              shadowRadius: 11,
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#00A1ED', '#0A3BC6']}
              style={buttonStyles.buttonBody}>
              <Text style={[styles.h1PBW, {fontSize: 20}]}>
                Create New Task
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* </ModalContent> */}
        </BottomModal>
      </View>
    );
  }
}

export default AllTasksScreen;
